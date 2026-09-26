---
name: instructor-briefing
description: >-
  Produces a private, night-before briefing for the TA on a given CCY4202 lab: the deep
  background behind every concept the lab touches, the questions students will actually
  ask (with answers), what breaks in the room, and where the lab simplifies things. Use
  whenever a lab is created or updated, or when the TA asks for teacher notes, a refresher,
  or prep for a session.
---

# Instructor Briefing Skill: Know More Than the Lab

The lab page is written for students. This briefing is for the person standing in front of them. Its job is to make sure the TA is never surprised by a question, a broken setup, or a detail the lab glossed over.

**Output location**: `teaching-notes/labXX.md`. This folder is excluded from the GitHub Pages deploy (see `.github/workflows/deploy.yml`), so answers and solutions never reach students. **Never** put briefing content in `labs/` or any deployed file.

**Voice**: follows [human-voice](../human-voice/SKILL.md). Plain, direct, a colleague briefing a colleague. No em dashes.

---

## 📥 Inputs

1. The lab file: `labs/labXX.html` (read it completely, including quiz feedback and accordions)
2. [`.agents/context/master-context.md`](../../context/master-context.md) for where the lab sits in the 14 weeks
3. [`.agents/context/student-profile.md`](../../context/student-profile.md) and [`classroom-context.md`](../../context/classroom-context.md) for who's in the room
4. The previous lab's briefing, if one exists, so you don't repeat what the TA already has

---

## 🧱 Required Structure

Use these sections in this order. Skip a section only if it truly has nothing in it.

### 1. The Point of Today (3–5 sentences)
What students should walk out able to *do*, and the one idea that everything else hangs on. Say what this lab sets up for next week.

### 2. Deep Background, Concept by Concept
One subsection per concept the lab uses, in the order the lab introduces them. Each subsection has:

- **How it actually works**: one level deeper than the lab. Mechanism, not definition.
- **Why a pentester cares**: the real-world reason, in one or two lines.
- **Say it in class**: one analogy or one-liner that works out loud.
- **Where the lab simplifies**: anything the lab rounds off, and the fuller truth. This is the most important part. If a sharp student pushes, the TA needs this.

### 3. Questions You'll Get (and Answers)
10–15 realistic questions, including the awkward ones ("why doesn't this work on real sites?", "is this legal?", "why not just use X?"). Short, confident answers.

### 4. What Will Break in the Room
Ordered by how many students it will hit. For each: the symptom students report, the cause, the fix. Include setup problems (Docker, proxy, certs, wifi), not just concept problems.

### 5. Verified Behavior
What the target actually returns for the lab's key steps, checked against a live instance where possible. Mark anything you couldn't verify as **unverified**. The TA should never be told something is true that wasn't checked.

### 6. Pacing Plan
A minute-by-minute outline for the 60 min session, with where to pause for driver swaps and where to cut if running late.

### 7. If You Have 5 Extra Minutes
One or two optional demos or discussion prompts that go deeper, for when a section finishes early.

### 8. Terms Cheat Card
The 10–15 terms from today, one line each, for glancing at mid-session.

---

## ✅ Quality Bar

- **Accuracy over coverage.** Verify version-specific details (menu paths, default settings, error messages) instead of repeating them from memory. When something differs between versions, say so.
- **Go deeper than the lab on every concept.** If the briefing only restates the lab, it failed.
- **Name the simplifications.** Every place the lab rounds off the truth gets called out in section 2.
- **Stay inside the lab's scope.** Deeper background on what's taught today, not a preview of techniques from later weeks. Point forward ("Week 3 covers this") instead of teaching it.
- **Scannable the night before.** Headings, short paragraphs, tables where they help. Aim for a 20–30 min read.
- **Lint** before finishing: `grep -n '—' teaching-notes/labXX.md` should return nothing.
