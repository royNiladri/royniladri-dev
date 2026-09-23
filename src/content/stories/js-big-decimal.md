---
subtitle: 'A side project about the oldest bug in JavaScript: 0.1 + 0.2 does not equal 0.3.'
metrics:
  - value: 'npm'
    label: 'published while at Visa'
  - value: 'TS'
    label: 'browser and Node'
flow:
  - 'Decimal string'
  - 'Parse'
  - 'Exact integer math'
  - 'Round'
  - 'Decimal string'
flowCaption: 'How a calculation stays exact (simplified diagram)'
---

## Context

JavaScript numbers are IEEE 754 doubles, which is the right answer for almost
everything and the wrong answer for money. Rounding error that is invisible in a
chart becomes a reconciliation problem on an invoice.

I was working on invoicing at the time. The need was ordinary and the available
options were either heavy or awkward, so I wrote a small one.

## What I did

`js-big-decimal` does arithmetic on decimal strings rather than floats: parse
the input, do the work in exact integer arithmetic, and only round when the
caller asks for rounding. It handles very large and very small numbers, because
the interesting failures are at the extremes.

It ships as TypeScript, bundled with Webpack, and works in the browser and in
Node without a different import path for each.

## The hard part

A library like this is mostly about the edges. Negative zero. Trailing zeros
that are significant in one context and noise in another. Rounding modes that
disagree with each other by design. Numbers long enough that a naive
implementation quietly turns quadratic.

The other hard part is that people depend on it. Once a package is in other
people's builds, a fix and a breaking change look the same from the outside, so
the bar for changing behaviour goes up permanently.

## Outcome

More than five million downloads so far. It is the piece of my work most likely
to be running somewhere I will never hear about, which is a strange and good
thing about open source.
