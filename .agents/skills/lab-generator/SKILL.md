---
name: lab-generator
description: >-
  Automated workflow for producing a first-pass CCY4202 lab HTML from a topic + section outline.
  Composes template + snippets + tri-layer pedagogy + auto-sync + tri-point registration in one
  pass so the TA only has to review, not scaffold. Use this as the default workflow for any new
  lab from Lab 02 onward.
---

# Lab Generator Skill: CCY4202 Automated First-Pass Lab

This skill turns *"here's a lab topic and section outline"* into a **complete first-pass lab HTML plus all registration updates**. Salah reviews and refines; the agent handles the boilerplate.

**Read first (in this order)**:
1. [`.agents/context/master-context.md`](../../context/master-context.md) — pedagogy + 14-week syllabus
2. [`.agents/context/classroom-context.md`](../../context/classroom-context.md) — Saturday cadence, projector distance
3. [`.agents/context/student-profile.md`](../../context/student-profile.md) — mixed prereqs, attention profile
4. [anti-cognitive-overload](../anti-cognitive-overload/SKILL.md) — hard rules (word caps, no walls, no citations)
5. [attention-design](../attention-design/SKILL.md) — engagement patterns (5-min resets, prediction prompts)
5b. [human-voice](../human-voice/SKILL.md) — how the copy should sound (no em dashes, no AI tics, light humor)
6. [lab-authoring](../lab-authoring/SKILL.md) — manual assembly runbook (fallback if generator can't handle a case)
7. [auto-reference-sync](../auto-reference-sync/SKILL.md) — cheatsheets/tools harvest rules
7b. [instructor-briefing](../instructor-briefing/SKILL.md) — produce the TA's night-before teaching notes
8. [`.agents/skills/lab-authoring/examples/lab-template.html`](../lab-authoring/examples/lab-template.html) — starting scaffold

---

## 📥 Input Contract (What the TA Provides)

The TA gives you these five inputs (short-form is fine):

1. **Lab metadata**: `{ number, title, time_estimate, difficulty, week_number }`
2. **Section outline**: array of `{ title, purpose, hands_on_action_or_null, component_hint }`
3. **Practice targets**: Juice Shop paths, PortSwigger lab URLs, or other
4. **Prerequisite knowledge assumed**: 3-5 concepts to test in the 60-sec entry checks
5. **New commands / tools introduced**: for auto-sync harvest into cheatsheets.html + tools.html

If any of these are missing, ask the TA once (concise question) before generating.

---

## ⚙️ Generation Process (Follow in Order)

### Step 1: Bootstrap the file

Run:
```bash
scripts/new-lab.sh <NUMBER> "<TITLE>" "<TIME>" "<DIFFICULTY>"
# e.g. scripts/new-lab.sh 03 "SQL Injection Fundamentals" "60 Mins" "Intermediate"
```

The script copies the template, substitutes `Lab XX`/`labXX` tokens, and prints the tri-point registration snippets.

If the script is unavailable, manually copy `.agents/skills/lab-authoring/examples/lab-template.html` → `labs/labXX.html` and substitute tokens by hand.

### Step 2: Add the classroom-specific header block

At the top of `<main class="main-content">` (after the breadcrumbs, before the `.lab-header`), inject:

1. **`.qr-jump`** — top-of-lab QR + short URL for students on their own laptops (fixes far-projector problem)
2. **`.callout--theory` "Skip & Navigate"** (Lab 02+ only) — explain which phase of the 5-phase pentest lifecycle this lab jumps to and why
3. **`.checklist-card`** — 3-item Lab Readiness Checklist (Docker up, target reachable, tools verified)

### Step 3: For each section from the outline, apply the tri-layer pattern

Every section from Lab 03 onward uses **three explicit layers**:

**Layer 1 — 60-second Entry Check** (only for sections that assume prereq knowledge):
```html
<details class="thought-accordion">
  <summary>🧠 Quick check: can you write a basic <code>SELECT ... WHERE</code>?</summary>
  <div>
    <p>A 90-sec refresher — skip if this is obvious:</p>
    <div class="terminal-window">...</div>
  </div>
</details>
```

**Layer 2 — Core Exercise (Baseline)**: everyone completes.
- Pick the component from `component_hint` in the outline
- Use `.bento-card` for exercises, `.terminal-window` for commands, `.diagram-card` for SVGs
- Use Juice Shop as the target (local Docker, offline-capable)

**Layer 3 — Stretch Challenge (Optional)**:
```html
<div class="bento-card bento-card--stretch">
  <span class="comparison-badge" style="color:var(--color-cyan);">⭐ STRETCH</span>
  <h4>Bonus: [advanced variant]</h4>
  <p>[optional deeper task, e.g. "dump the users table using UNION"]</p>
</div>
```

### Step 4: Insert attention resets every 5-7 min of estimated read time

Between or within sections:
- **`.prediction-prompt`** before any non-obvious reveal (minimum 2 per lab, per [attention-design](../attention-design/SKILL.md))
- **`.info-dense-card`** wherever 4+ same-shape bullets would appear
- **`.callout--tip`** with "Rotate keyboard driver" at ~15-min marks

### Step 5: Target-first pattern

- Introduce Juice Shop with `.target-launcher` (Docker one-liner + verify) — **primary path**
- Introduce PortSwigger with `.target-launcher--hosted` variant (link only, no Docker step) — **enrichment path**
- **Every core exercise must have a Juice Shop path** — PortSwigger is enrichment/take-home only, because university wifi is unreliable
- If PortSwigger is referenced, note the offline-cache fallback at `labs/offline-cache/portswigger-labXX.pdf`

### Step 6: Assemble the quiz section

- **5-7 questions minimum**
- **Mix**: ~40% MCQ, ~30% terminal-challenge (regex-validated via `quiz.js`), ~30% scenario / spot-difference / which-tool
- Every question must relate directly to a hands-on task earlier in the lab (no trivia)
- Use `.quiz-card` with `data-question-id="q-XX-N"`

### Step 7: Auto-sync harvest (mandatory — enforced by [auto-reference-sync](../auto-reference-sync/SKILL.md))

Extract from the finished lab and update:
- **`cheatsheets.html`** — new commands, grouped by attack type/topic
- **`tools.html`** — new tools (Docker command, verify step, "Active in: Lab XX")
- **`assets/js/site.js`** — extend `searchCatalog` with the lab entry + each new tool + each key concept

### Step 8: Tri-point registration

- **`assets/js/lab-common.js`** — extend `MODULE_TREE_DATA` (add lab entry to `mod01.labs` array)
- **`assets/js/site.js`** — extend `searchCatalog` (also covered by Step 7)
- **`index.html`** — new `.bento-card` in the modules bento-grid

`scripts/new-lab.sh` prints copy-paste snippets for all three. Just apply them.

### Step 9: Verification (before handing back to TA)

Run through all three audit checklists:
- [anti-cognitive-overload checklist](../anti-cognitive-overload/SKILL.md#the-cognitive-load-audit-checklist)
- [attention-design checklist](../attention-design/SKILL.md#attention-design-audit-checklist)
- [human-voice pre-commit check](../human-voice/SKILL.md#-pre-commit-voice-check) (em-dash lint must be clean)
- [lab-authoring Step 5 verification](../lab-authoring/SKILL.md)

Then:
- `grep -n "{{" labs/labXX.html` returns **0 matches** (no unresolved tokens)
- All `<h2>`/`<h3>` have stable kebab-case `id` attributes
- Open lab locally (`python3 -m http.server 8000`) — sidebar highlights lab, `.you-are-here` appears as you scroll, `.qr-jump` shows the URL, `.prediction-prompt` reveals on click, quiz validates

---

## 📤 Output Contract (What the TA Gets Back)

1. **`labs/labXX.html`** — complete first-pass lab
2. **Updated files**: `cheatsheets.html`, `tools.html`, `assets/js/site.js`, `assets/js/lab-common.js`, `index.html`
3. **A single review checklist** in the response, calling out:
   - Any placeholder text still needing SME judgment (mark with `[TA REVIEW: ...]`)
   - Sections where the SVG scaffold needs a real diagram
   - Any tool/target new to the course (needs first-time setup guidance in tools.html)
   - Any PortSwigger references (needs matching offline cache in `labs/offline-cache/`)

---

## 🧭 When NOT to Use This Skill

- **Refactoring an existing lab** — use manual editing + [lab-authoring](../lab-authoring/SKILL.md) runbook instead. Generator overwrites; refactor preserves.
- **Non-lab pages** (cheatsheets, tools, index) — use [course-workflows](../course-workflows/SKILL.md).
- **When the TA hasn't provided the section outline** — ask for it first; do not invent lab structure.

---

## Related Skills

- [attention-design](../attention-design/SKILL.md) — engagement patterns you must apply
- [anti-cognitive-overload](../anti-cognitive-overload/SKILL.md) — hard rules
- [lab-authoring](../lab-authoring/SKILL.md) — manual runbook (fallback + reference)
- [auto-reference-sync](../auto-reference-sync/SKILL.md) — cheatsheets/tools harvest
