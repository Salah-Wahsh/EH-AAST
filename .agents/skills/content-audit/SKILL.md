---
name: content-audit
description: >-
  Full technical-accuracy and claim-placement audit for CCY4202 content (labs, teaching
  notes, cheat sheets, tools, quiz answer keys). Catches statements that are wrong,
  misleading, in the wrong container (e.g. a request fact placed in a response card),
  security-inverted (making a vuln sound like correct behavior), overclaimed, stale,
  self-contradictory, or a dead-end instruction. Use before deploying any lab, when the
  user asks to "audit", "check for mistakes", "review the content", or "make sure it's
  correct", and as the accuracy gate in the lab-authoring runbook.
---

# Content Audit Skill: Is It True, and Is It in the Right Place?

`human-voice` checks *how it sounds*. `anti-cognitive-overload` checks *how much*. `attention-design` checks *when to interrupt*. This skill checks the thing none of those do: **is every claim correct, precisely worded, and sitting in the right container?**

The bug that motivated this skill: a true sentence ("you can change any of it") was placed in the **RESPONSE** card instead of the **REQUEST** card, and worded as "the server *has to* trust whatever arrives" — which teaches students that trusting attacker input is required behavior, not a choice a lazy server makes. Technically almost-defensible, pedagogically wrong. This skill exists to catch that class of defect systematically.

---

## 🎯 When to Run

- Before deploying any new or edited lab (this is the accuracy gate in [lab-authoring](../lab-authoring/SKILL.md) Step 5).
- When the user says "audit", "check for mistakes", "review the content", "make sure it's right", or points at one error and asks whether the same mistake is elsewhere.
- After any bulk edit that touched conceptual copy, commands, or the quiz answer key.
- On the matching `teaching-notes/labXX.md` at the same time — notes and lab must agree.

Audit **all** content: `labs/*.html`, `teaching-notes/*.md`, and the harvested `cheatsheets.html` / `tools.html` entries for that lab.

---

## 🔍 The Defect Taxonomy (What You're Hunting)

Go through every one of these. Most findings fall into 1, 2, or 3.

| # | Defect | What it looks like | Example |
|---|---|---|---|
| **1** | **Wrong placement** | A true statement under the wrong heading, card, column, or role. | "You control every byte" in the *response* card instead of the *request* card. |
| **2** | **Misleading precision** | Technically defensible, teaches the wrong mental model. Watch **security inversion**: wording that makes the vulnerable behavior sound required or safe. | "The server *has to* trust whatever arrives" (implies obligation; the point is it *shouldn't*). |
| **3** | **Factual / technical error** | Wrong flag, port, status code, menu path, image name, or a claim about target behavior that doesn't match the live target. | Wrong Burp menu path; `-sS` described as a connect scan; claiming a 200 where the target returns 500. |
| **4** | **Over/underclaim** | Absolute words (`always`, `never`, `any`, `all`, `every`) that aren't literally true, or a claim missing its caveat. | "Every field is tamperable" without "tamperable ≠ exploitable". |
| **5** | **Stale reference** | A path, name, version, or URL that drifts over time. | Burp menu renamed; `bkimminich/juice-shop` typo; a PortSwigger lab slug that moved. |
| **6** | **Contradiction** | Lab §A disagrees with §B, or lab disagrees with the teaching note, or the quiz body disagrees with its answer key / `data-expected-regex`. | §2 says Intercept OFF still logs; a later callout implies it doesn't. |
| **7** | **Dead-end instruction** | A step that can't be completed as written, or a command that fails with no troubleshooting hint. | A `docker run` missing `-p`, or a probe that times out silently when Intercept is ON. |
| **8** | **Role / direction error** | Attacker vs defender, client vs server, request vs response, safe vs idempotent stated backwards. | Calling GET "not idempotent"; drawing the response arrow from client to server. |

---

## 📋 The Audit Procedure

### Step 1 — Extract the prose from the page
Strip tags and scripts so you read claims, not markup. This is faster and catches things that scroll off in raw HTML:
```bash
python3 - <<'EOF'
import re, html
s = open('labs/labXX.html').read()
s = re.sub(r'(?s)<style.*?</style>|<script.*?</script>', '', s)
for i, l in enumerate(s.split('\n'), 1):
    t = html.unescape(re.sub(r'<[^>]+>', '', l)).strip()
    if t: print(i, t)
EOF
```
Keep the line numbers. Every finding must cite `file:line`.

### Step 2 — Map each claim to its container
For every comparison card, table column, SVG arrow, and callout, ask: **does this specific sentence belong under this specific heading?** A request fact under a response header is defect #1 even when the sentence is true. Read the card title, then read each bullet against it.

### Step 3 — Check claims against ground truth
- **Commands / flags / ports / status codes**: verify against the tool, not memory. When the claim is about the target's behavior (e.g. "the search returns a 500 with `SQLITE_ERROR`"), confirm it matches what the live target actually does. The [instructor-briefing](../instructor-briefing/SKILL.md) verified-behavior table is the reference; if a claim isn't backed there, verify it or flag it.
- **Menu paths** (Burp, DevTools, Firefox): these get renamed. Flag any that look version-specific without a hedge.
- **Security framing**: for every sentence describing a vulnerability, check it doesn't imply the insecure behavior is required, correct, or safe (defect #2/#8). The vuln is a *choice the developer got wrong*, never an obligation.

### Step 4 — Check across files
- **Lab ↔ teaching note**: the note must not contradict the lab, and should carry the caveats the lab compresses (e.g. "tamperable ≠ exploitable").
- **Quiz body ↔ answer key**: the marked-correct option and every `data-expected-regex` / `data-solution-rationale` must match what the body taught.
- **Lab ↔ cheatsheets/tools**: harvested commands and image names must match the lab exactly.

### Step 5 — Sweep for the absolutes
```bash
grep -niE '\b(always|never|any|all|every|has to|must|forced to|cannot|guaranteed)\b' labs/labXX.html
```
Read each hit in context. Most are fine; you're looking for the one that overclaims (#4) or inverts a role/security fact (#2, #8).

### Step 6 — Report, then fix
Report findings first as a table (below). Fix in place only after the user has seen the list, unless they said "audit and fix". When you fix, re-run Step 1 to confirm the edit landed where you meant and didn't introduce a new placement bug.

---

## 📝 Findings Report Format

One table, most severe first. No prose padding.

```
| Sev | Location | Defect (#) | What's wrong | Fix |
|-----|----------|-----------|--------------|-----|
| 🔴  | lab02.html:198 | 1 + 2 | "You can change any of it… server has to trust" sits in the RESPONSE card and implies the server is obligated to trust input | Move to REQUEST card; reword to "You control every byte of this. The server can't tell if your browser wrote it or you did." |
```

Severity:
- 🔴 **Wrong or misleading**: a student learns something false (defects 1, 2, 3, 8). Fix before deploy.
- 🟡 **Imprecise or fragile**: overclaim without caveat, stale-looking path, missing troubleshooting (4, 5, 7). Fix before deploy if quick.
- ⚪ **Nit**: consistency or wording that isn't wrong. Batch or skip.

End with a one-line verdict: `N findings (X red). Clean to deploy after reds.` If nothing is wrong, say so plainly — don't invent findings to look thorough.

---

## ⚖️ Scope Boundary

This skill does **not** re-check voice, verbosity, or attention pacing — those have their own skills. If an accuracy fix also improves the wording, apply the [human-voice](../human-voice/SKILL.md) rules while you're in there (no em dashes, no hype, contractions), but the audit's job is *correctness and placement*. Don't fail a lab here for a tone issue; note it and move on.
