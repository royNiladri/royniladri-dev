---
subtitle: 'Enrichment that suggests, a human that decides, and five layers that had to agree on what a record is.'
metrics:
  - value: '5 layers'
    label: 'UI to search index'
  - value: 'Stage'
    label: 'Informatica World 2023'
flow:
  - 'Record'
  - 'Enrichment UI'
  - 'Enrichment service'
  - 'Model serving'
  - 'BPEL workflow'
  - 'Elasticsearch'
flowCaption: 'How a record flows (simplified diagram)'
---

## Context

Master Data Management exists so a large company can point at one trusted record
for each customer, product and supplier. Getting to that record is mostly
patient, unglamorous work: matching, merging, reviewing, approving.

The question we took on was whether a model could do the first pass — propose
the missing attributes, the better category, the cleaner description — and leave
the human reviewer to accept or reject. That only pays off if the suggestion
arrives inside the workflow the reviewer is already in. A separate tool would
have been ignored.

## What I did

I worked across the whole path a suggestion travels. The enrichment UI, so a
reviewer can see what was proposed and why. The backend service that brokers the
request. Model serving, so predictions come back fast enough to sit in a review
screen. The BPEL workflow, so an accepted suggestion becomes a real change with
an approval trail behind it. And Elasticsearch tuning, so enriched records stay
searchable as volume grows.

Batch was its own problem. Reviewing one record at a time is fine; a customer
importing hundreds of thousands needs predictions in parallel, which meant
reworking how the job fanned out requests instead of walking the list.

## The hard part

No single layer was hard. Keeping five of them agreeing on the same record while
each one changed underneath us was.

An enrichment is a suggestion until a human accepts it, and the product has to
hold both states without confusing anyone: what the record says now, what the
model thinks it should say, and who decided. That distinction had to survive the
UI, the service contract, the workflow and the search index. Most of the design
argument was about where the suggestion lived before it became a fact.

## Outcome

The feature was shown on stage at Informatica World 2023 and contributed to a
sales lift of more than 20%. More usefully for the team, it established the
pattern the later work built on — the framework that eventually called multiple
external systems, including fine-tuned internal LLMs, reused this shape.
