/**
 * Work-history island.
 *
 * The page ships every employer, role and project as static HTML. This script
 * only decides what is shown: which employer, which skill, Highlights vs
 * Everything, and which roles are open. With JavaScript off none of this runs
 * and the page stays fully readable with everything expanded.
 *
 * State lives in the URL too, so a filtered view can be shared:
 *   /work?employer=inf&skill=AI%2FML&view=all
 */

type View = 'hi' | 'all';

interface ProjectNode {
  el: HTMLElement;
  highlight: boolean;
  skills: string[];
}

interface ChipNode {
  el: HTMLElement;
  skills: string[];
}

interface RoleNode {
  el: HTMLElement;
  id: string;
  toggle: HTMLButtonElement | null;
  more: HTMLButtonElement | null;
  chips: ChipNode[];
  projects: ProjectNode[];
}

interface EmployerNode {
  el: HTMLElement;
  id: string;
  name: string;
  roles: RoleNode[];
}

interface State {
  view: View;
  skill: string;
  employer: string;
  /** Roles the visitor opened while in Highlights view. */
  openHi: Set<string>;
  /** Roles the visitor collapsed while in Everything view. */
  closedAll: Set<string>;
}

const ALL = 'All';

function parseSkills(el: HTMLElement): string[] {
  const raw = el.dataset.skills ?? '';
  return raw ? raw.split('|') : [];
}

function plural(n: number, word: string): string {
  return `${n} ${word}${n === 1 ? '' : 's'}`;
}

export function initWorkHistory(): void {
  const root = document.querySelector<HTMLElement>('[data-work-history]');
  if (!root) return;

  const countLine = document.querySelector<HTMLElement>('[data-count-line]');
  const emptyNote = root.querySelector<HTMLElement>('[data-empty]');
  const viewButtons = document.querySelectorAll<HTMLElement>('[data-view-pick]');

  const employers: EmployerNode[] = [
    ...root.querySelectorAll<HTMLElement>('section[data-emp]'),
  ].map((el) => ({
    el,
    id: el.dataset.emp ?? '',
    name: el.querySelector('h2')?.textContent?.trim() ?? '',
    roles: [...el.querySelectorAll<HTMLElement>('[data-role]')].map(
      (roleEl) => ({
        el: roleEl,
        id: roleEl.dataset.role ?? '',
        toggle: roleEl.querySelector<HTMLButtonElement>('[data-role-toggle]'),
        more: roleEl.querySelector<HTMLButtonElement>('[data-role-more]'),
        chips: [...roleEl.querySelectorAll<HTMLElement>('[data-hi-chip]')].map(
          (chipEl) => ({ el: chipEl, skills: parseSkills(chipEl) }),
        ),
        projects: [...roleEl.querySelectorAll<HTMLElement>('[data-proj]')].map(
          (projEl) => ({
            el: projEl,
            highlight: projEl.dataset.hi === 'true',
            skills: parseSkills(projEl),
          }),
        ),
      }),
    ),
  }));

  if (employers.length === 0) return;

  const knownEmployers = new Set(employers.map((e) => e.id));
  const knownSkills = new Set(
    [...root.querySelectorAll<HTMLElement>('[data-skill-pick]')].map(
      (el) => el.dataset.skillPick ?? '',
    ),
  );

  const state: State = {
    view: 'hi',
    skill: ALL,
    employer: 'all',
    openHi: new Set(),
    closedAll: new Set(),
  };

  // --- URL -----------------------------------------------------------------

  function readUrl(): void {
    const params = new URLSearchParams(window.location.search);

    const view = params.get('view');
    if (view === 'hi' || view === 'all') state.view = view;

    const skill = params.get('skill');
    if (skill && knownSkills.has(skill)) state.skill = skill;

    const employer = params.get('employer');
    if (employer && (employer === 'all' || knownEmployers.has(employer))) {
      state.employer = employer;
    }
  }

  function writeUrl(): void {
    const params = new URLSearchParams();
    if (state.view !== 'hi') params.set('view', state.view);
    if (state.skill !== ALL) params.set('skill', state.skill);
    if (state.employer !== 'all') params.set('employer', state.employer);

    const query = params.toString();
    const url =
      window.location.pathname +
      (query ? `?${query}` : '') +
      window.location.hash;
    window.history.replaceState(null, '', url);
  }

  // --- Render --------------------------------------------------------------

  const matches = (skills: string[]): boolean =>
    state.skill === ALL || skills.includes(state.skill);

  function isOpen(role: RoleNode): boolean {
    return state.view === 'hi'
      ? state.openHi.has(role.id)
      : !state.closedAll.has(role.id);
  }

  function render(): void {
    let shown = 0;
    let matched = 0;
    let anyEmployerVisible = false;

    for (const employer of employers) {
      const picked =
        state.employer === 'all' || state.employer === employer.id;
      let anyRoleVisible = false;

      for (const role of employer.roles) {
        const matching = role.projects.filter((p) => matches(p.skills));
        const highlights = matching.filter((p) => p.highlight);

        // Kept in sync even for roles that are currently hidden, so nothing
        // stale is revealed when the filter changes back.
        for (const project of role.projects) {
          const inView = state.view === 'all' || project.highlight;
          project.el.hidden = !(matches(project.skills) && inView);
        }

        for (const chip of role.chips) {
          chip.el.hidden = !matches(chip.skills);
        }

        const visible = picked && matching.length > 0;
        role.el.hidden = !visible;
        if (!visible) continue;

        anyRoleVisible = true;
        matched += matching.length;
        shown += state.view === 'hi' ? highlights.length : matching.length;

        // In Highlights view a role whose matches are all non-highlights has
        // nothing to open — its toggle becomes a jump into Everything instead.
        const noHighlights = state.view === 'hi' && highlights.length === 0;
        const open = isOpen(role) && !noHighlights;
        role.el.dataset.open = String(open);

        if (role.toggle) {
          if (noHighlights) {
            role.toggle.textContent = `See ${matching.length} in Everything`;
            role.toggle.dataset.action = 'to-everything';
          } else {
            const count =
              state.view === 'hi' ? highlights.length : matching.length;
            const noun = state.view === 'hi' ? 'highlight' : 'project';
            role.toggle.textContent = open
              ? '− Collapse'
              : `+ Show ${plural(count, noun)}`;
            role.toggle.dataset.action = 'toggle';
          }
          role.toggle.setAttribute('aria-expanded', String(open));
        }

        if (role.more) {
          const extra = matching.length - highlights.length;
          const showMore = state.view === 'hi' && open && extra > 0;
          role.more.hidden = !showMore;
          if (showMore) role.more.textContent = `+ ${extra} more in Everything`;
        }
      }

      const employerVisible = picked && anyRoleVisible;
      employer.el.hidden = !employerVisible;
      if (employerVisible) anyEmployerVisible = true;
    }

    if (emptyNote) emptyNote.hidden = anyEmployerVisible;

    if (countLine) {
      const employerName =
        employers.find((e) => e.id === state.employer)?.name ?? '';
      const where = state.employer === 'all' ? '' : ` at ${employerName}`;
      const tagged = state.skill === ALL ? '' : ` tagged ${state.skill}`;
      countLine.textContent =
        state.view === 'hi'
          ? `Showing ${plural(shown, 'highlight')} of ${plural(matched, 'project')}${tagged}${where}.`
          : `Showing ${matched === 1 ? '' : 'all '}${plural(matched, 'project')}${tagged}${where}.`;
    }

    syncControls();
    writeUrl();
  }

  function syncControls(): void {
    const set = (el: HTMLElement, on: boolean) => {
      el.dataset.active = String(on);
      el.setAttribute('aria-pressed', String(on));
    };

    viewButtons.forEach((el) => set(el, el.dataset.viewPick === state.view));
    root!
      .querySelectorAll<HTMLElement>('[data-skill-pick]')
      .forEach((el) => set(el, el.dataset.skillPick === state.skill));
    root!
      .querySelectorAll<HTMLElement>('[data-employer-pick]')
      .forEach((el) => set(el, el.dataset.employerPick === state.employer));
  }

  function setView(view: View): void {
    state.view = view;
    render();
  }

  // --- Events --------------------------------------------------------------

  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement | null;
    if (!target) return;

    const view = target.closest<HTMLElement>('[data-view-pick]');
    if (view) {
      setView(view.dataset.viewPick === 'all' ? 'all' : 'hi');
      return;
    }

    const skill = target.closest<HTMLElement>('[data-skill-pick]');
    if (skill) {
      state.skill = skill.dataset.skillPick ?? ALL;
      render();
      return;
    }

    const employer = target.closest<HTMLElement>('[data-employer-pick]');
    if (employer) {
      state.employer = employer.dataset.employerPick ?? 'all';
      render();
      return;
    }

    const toggle = target.closest<HTMLButtonElement>('[data-role-toggle]');
    if (toggle) {
      const id = toggle.closest<HTMLElement>('[data-role]')?.dataset.role;
      if (!id) return;

      if (toggle.dataset.action === 'to-everything') {
        state.closedAll.delete(id);
        setView('all');
      } else if (state.view === 'hi') {
        if (state.openHi.has(id)) state.openHi.delete(id);
        else state.openHi.add(id);
        render();
      } else {
        if (state.closedAll.has(id)) state.closedAll.delete(id);
        else state.closedAll.add(id);
        render();
      }
      return;
    }

    const more = target.closest<HTMLButtonElement>('[data-role-more]');
    if (more) {
      const id = more.closest<HTMLElement>('[data-role]')?.dataset.role;
      if (id) state.closedAll.delete(id);
      setView('all');
      return;
    }

    if (target.closest<HTMLElement>('[data-reset]')) {
      state.skill = ALL;
      state.employer = 'all';
      render();
    }
  });

  // --- Boot ----------------------------------------------------------------

  readUrl();

  // A deep link such as /work#role-inf2 opens that role and scrolls to it.
  const deepLink = window.location.hash.match(/^#role-(.+)$/);
  const deepRole = deepLink ? decodeURIComponent(deepLink[1]!) : null;
  if (deepRole) {
    state.openHi.add(deepRole);
    state.closedAll.delete(deepRole);
  }

  render();

  if (deepRole) {
    document.getElementById(`role-${deepRole}`)?.scrollIntoView({
      block: 'start',
    });
  }
}
