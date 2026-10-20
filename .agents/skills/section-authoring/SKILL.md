---
name: section-authoring
description: >-
  How to actually build a lab section so it teaches, not narrates. The positive
  method behind every CCY4202 section: anchor it to a real-world consequence, build
  outward from a fully worked example, fade the help across repeats, and end on the
  student doing it themselves. This is the spine skill. It calls human-voice (how it
  sounds), anti-cognitive-overload (how much), and content-audit (is it true). Use it
  before writing or rewriting any section of any lab.
---

# Section Authoring: Teach the Thing, Don't Narrate It

The problem this fixes: content that reads as AI-generated and doesn't actually land for
the student, even when the voice rules are followed. The fix isn't another ban list. It's
writing every section from the right skeleton so the tells never get written in the first
place.

This skill is the spine. It leans on:
- [human-voice](../human-voice/SKILL.md) for how it sounds (run its lint before you finish).
- [anti-cognitive-overload](../anti-cognitive-overload/SKILL.md) for how much to put on screen.
- [content-audit](../content-audit/SKILL.md) for whether every claim is true and in the right place.
- The accuracy gate below, for running the target before you write anything about how it behaves.

Throughout this file, "the TA" means the person authoring the course (currently Salah). "The student" means only the 4th-year learner reading the lab. Don't mix them up.

---

## The one rule that kills the AI feel

**Write about the attack, never about the lesson.**

The deleted-on-sight list from Lab 03 (the TA removed every one of these):
- Difficulty-intro cards ("🟢 Baseline / 🟡 Stretch" as a preamble), "here's why we switch tools," "the one idea behind today."
- Parenthetical subtitles on headings ("(what you did)" / "(the real world)").
- Logistics in student copy ("in-class if wifi holds, else take-home").
- Any sentence whose job is to describe the lab's own structure.

A TA talking to the room doesn't announce the structure. They point at the thing and say what it does. If a sentence would survive being read aloud to a bored 4th-year at 8:30 on a Saturday, keep it. If it sounds like a syllabus, cut it.

---

## How to build one section (the order matters)

Do these in order. The order is the method.

### 1. Anchor it to a real consequence first
Before the mechanics, one short, concrete hit of why this matters. The granularity depends on
where you are:

- **Opening a new vulnerability (or a new lab):** a real named incident or a believable
  scenario with a victim and a cost. Not "XSS is dangerous and widespread." Something like
  *the 2018 British Airways skimmer that lived in a few lines of injected JavaScript and
  lifted 380,000 card numbers.* Two or three sentences, then move to the hands-on. This is a
  standing requirement on every vuln lab, not optional color.
- **Opening a later section inside the same lab:** don't tell another breach story, it gets
  formulaic fast. Anchor instead on the operational consequence of the step before it, the
  thing that's still broken or still out of reach. "You proved the injection works, but the
  login handler still rejects you, so now you..." One sentence is enough.

Students care about a thing that happened to someone, or a concrete next obstacle. They tune
out a severity adjective.

### 2. Pick the concrete artifact, then build the prose around it
Decide the exact thing on screen first: the real request, the exact query with the payload
already substituted in, the real response with real values. Write that out in full. Then,
and only then, write the sentences around it, and only for the part that isn't obvious from
looking at the artifact.

On the first pass of a technique (the 🟢 worked example), never ship a bare fragment. Show the
whole thing with the payload in place, not `... AND <condition>`. Students got lost in Lab 03
exactly where the context around a snippet was cut. Full worked examples are what novices learn
from; fragments are what experts fill in, and the room is not all experts.

Fading (next step) is not the same as clipping. When you blank a slot in 🟡, keep the whole
surrounding request or query intact and visible, and remove only the one piece the student is
now expected to supply. You're hiding the answer, never the context.

### 3. Fade the help as the technique repeats
First time a technique appears: fully worked, every step shown.
Second time: keep the full request or query on screen, blank only the slot the student should
now supply, let them fill it.
Third time: it's theirs to produce, you just state the goal.

This is the worked-example-to-problem arc. It's what moves a beginner to doing it alone, and
it keeps the strong student from being bored by help they no longer need. The three depth
tiers (🟢/🟡/🔴) are this same idea per exercise: 🟢 fully worked, 🟡 training wheels off,
🔴 career-grade (see below).

### 4. Make 🔴 Going Pro genuinely career-grade
The red tier has to be something a working pentester actually does on an engagement, not a
cosmetically harder version of the baseline. Filter/WAF bypass, CSP evasion, chaining two
bugs, crafting the real exfil payload, writing the CVSS. If a strong student can clear it
without learning anything they could use in a job, it isn't 🔴 yet. The TA explicitly
wants the advanced path to be the kind of thing that helps students in their career.

### 5. Prediction prompt before the reveal
Before you show what a payload does, ask the student to guess, in writing, then reveal. This
is the highest-ROI attention reset in the room. One per exercise, in a `🤔 ... Reveal`
accordion. The guess is the engagement; the reveal is the payoff.

### 6. End the section on the student's own action
Every section culminates in a concrete thing they do: a payload typed, a request sent, a box
ticked, a finding written. Not a summary paragraph. If the last thing in a section is prose,
you're narrating again.

---

## The accuracy gate (non-negotiable)

Before any claim about how the target behaves goes into a lab, run it against the live target
this session and paste the real output. The environment can run the dockerized targets
(`docker run --rm -d -p 3000:3000 bkimminich/juice-shop`), reach PortSwigger, and run Node and
Python. There is no excuse to assert a mechanism from memory.

Procedure:
1. Spin up the target.
2. Run every payload the lab will show. Decode what you send, read what comes back.
3. Record real status codes, real row counts, real response fields in an evidence table.
4. Show the TA that evidence table before any prose gets written.
5. Anything you genuinely can't run gets flagged as unverified, in the teaching note, not
   stated as fact in the lab.

Everything plausible-but-wrong that got caught in Lab 03 (the search box that doesn't inject,
the "binary search" that wasn't, the column types) would have died at step 2.

The specific ways plausible reasoning went wrong before, kept here so this travels with the
repo instead of living in one assistant's private memory:
- A UI control sending input does not mean that input reaches the query. The Juice Shop
  magnifier box sends an empty `q` and keeps the payload client-side; the real injection point
  is the search API hit directly. Don't say a field "sanitizes" when it simply never carries
  the value. Check where the input actually lands.
- "Binary search" means halving a numeric range, not firing ad-hoc probes. A character is its
  code; you narrow the code range by half each yes/no question. Don't label something a binary
  search unless it is one.
- UNION column *count* must match; column *type* matching is engine-dependent (strict on
  Postgres/SQL Server, loose on SQLite/MySQL). Verify against the engine the target runs.
- A payload that is valid SQL can still error inside the app's own post-processing (Juice Shop
  throws on `NULL` in i18n'd display columns). Run it; don't assume the SQL parsing is the only
  thing that can break.

The rule behind all of these: decode what you send, read what actually comes back, and quote
the real numbers. When a claim can't be run, say so in the teaching note rather than asserting
it.

---

## Working cadence (so a whole lab never gets rewritten again)

1. Verify live, show the evidence table.
2. Draft **one** section in this method. Stop. Let the TA react.
3. Lock the pattern from their feedback.
4. Apply it to the rest of the lab.
5. Run content-audit and the human-voice lint. Then push.

The TA course-corrects on section one, which is cheap. They do not edit a finished lab.

---

## Before / after (same content, one narrates, one teaches)

**Narrated (AI feel):**
> In this section, we will explore the fascinating world of stored XSS. Stored XSS is a
> crucial and powerful vulnerability. It's not just a bug, it's a persistent threat. Let's
> dive in and unlock how it works!

**Taught:**
> In 2018, attackers slipped a few lines of JavaScript into British Airways' payment page.
> Every customer who checked out ran it, and it shipped their card details to the attacker.
> 380,000 cards. That's stored XSS: your script lands in the database, and the server hands
> it to every visitor afterward. Here's the exact comment that does it on Juice Shop:
>
> *(real payload, in full, verified live)*
>
> 🤔 Before you send it: whose browser runs this script, and when? Write your guess.

---

## Quick self-check before you call a section done

- Did it open on a real consequence, not a severity adjective?
- Is the worked example shown in full, with the payload substituted, verified live?
- Does the help fade if this technique already appeared earlier?
- Is 🔴 something a pro actually does, not just "harder"?
- Is there a prediction prompt before the reveal?
- Does the section end on the student's action, not a summary?
- Does every claim about the target match what you ran?
- human-voice lint clean (no em dashes, no triplets, no hedges, no structure-narration)?
