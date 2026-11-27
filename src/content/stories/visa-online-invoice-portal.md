---
subtitle: 'The portal that invoices Visa member banks worldwide, built to run everywhere including IE7.'
metrics:
  - value: 'IE7+'
    label: 'browser support floor'
  - value: 'Jenkins'
    label: 'CI/CD on a dedicated build server'
flow:
  - 'Pricing data'
  - 'Invoice generation'
  - 'Portal UI'
  - 'Member banks'
flowCaption: 'How an invoice reaches a bank (simplified diagram)'
---

## Context

Visa bills its member banks, and those invoices are generated and delivered
through a portal. It was my first job, and the first thing I learned is that
software with money on the other end of it is judged differently: the interface
can be plain, but the number has to be right and the page has to open.

"Has to open" meant every bank, on whatever they had. In practice the floor was
Internet Explorer 7.

## What I did

I helped build the portal itself, and set up the delivery around it: Jenkins
CI/CD on a dedicated build server, so a change went from commit to a testable
build without anyone assembling it by hand.

The browser floor shaped the frontend more than any other constraint. Modern
conveniences were checked against IE7 before they were used, and where the gap
was too wide the feature was built twice rather than degraded into something
that looked broken.

Later, as part of the 2018 work, I led the migration of the frontend to
Angular 6 — for performance, compatibility and security, and with enough test
coverage to make the cutover boring.

## The hard part

Supporting a browser a decade out of date while the rest of the stack moves
forward is a discipline problem, not a technical one. It is very easy to write
the modern version and assume someone will catch the regression.

The migration years later had the opposite difficulty: replacing the frontend of
a system that was live globally, where the fallback plan cannot be "roll back
and try again next quarter" because banks are being invoiced in the meantime.

## Outcome

The portal was live globally as of 2020, invoicing member banks worldwide. The
Angular 6 migration shipped with the performance and security improvements it
was scoped for, and the CI/CD setup outlived my time on the team.
