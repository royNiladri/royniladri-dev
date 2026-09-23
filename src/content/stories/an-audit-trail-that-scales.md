---
subtitle: 'An audit trail nobody reads until it matters, made cheap enough to keep and fast enough to search.'
metrics:
  - value: '50%+'
    label: 'faster responses'
  - value: 'A/B'
    label: 'every change measured'
flow:
  - 'Import job'
  - 'Change events'
  - 'Batched writes'
  - 'Elasticsearch'
  - 'Search · DR'
flowCaption: 'How a change becomes a searchable event (simplified diagram)'
---

## Context

Every change to a mastered record has to be answerable later: what changed, who
changed it, when. It is the kind of feature that is invisible until an auditor
or an incident asks for it, and then it is the only feature that matters.

The cost of that promise showed up in import jobs. A large import is millions of
small changes, and each one was landing in the search index on its own. The
write path, not the read path, was the expensive part.

## What I did

I moved import jobs onto batched writes into Elasticsearch, and treated the
batching as a tuning problem rather than a constant: batch size, flush timing
and back-pressure all had to hold up under a job far larger than anything in the
test fixtures.

Around that I brought the rest of what an audit trail needs to be trustworthy —
search over the history, lifecycle management so it does not grow forever,
disaster recovery, and an honest account of eventual consistency: how long after
a change the trail is guaranteed to show it, and what the UI says in the gap.

Every change shipped with A/B performance metrics. Before and after, same
workload, numbers attached.

## The hard part

Batching trades freshness for throughput, and the argument is about how much.
Too eager and the saving disappears; too lazy and a user who just made a change
does not see it in the history, which reads as a bug no matter what the design
doc says.

Settling that needed measurement rather than opinion, which is why the A/B
metrics came first and the tuning came second.

## Outcome

Operating cost fell by 30% and response times improved by more than 50%, with
the before-and-after numbers to back both. The audit trail kept its guarantees,
and the batching approach became the reference for other write-heavy paths in
the product.
