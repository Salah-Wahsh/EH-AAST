---
name: attention-design
description: >-
  Engagement patterns and hard rules for keeping the CCY4202 lecture-hall audience
  (50-60 mixed-background students with attention-span challenges) focused across a
  60-min lab. Enforces interaction cadence, prediction prompts, info density, and
  far-projector-friendly navigation. Apply to every lab from Lab 03 onward.
---

# Attention Design Skill: CCY4202 Ethical Hacking Labs

Codifies the interaction patterns needed to hold attention in a large, distracted classroom. All labs from Lab 03 onward must comply with this skill in addition to [anti-cognitive-overload](../anti-cognitive-overload/SKILL.md).

**Read first**:
- [`.agents/context/student-profile.md`](../../context/student-profile.md) — attention profile, engagement triggers
- [`.agents/context/classroom-context.md`](../../context/classroom-context.md) — physical constraints (Saturdays × 2 sections, 50-60 students, far projector)

---

## 🎯 The Core Rule: Interaction Every 5–7 Minutes

Sustained-attention ceiling for this audience is ~5–7 min before an interaction reset is required — this is **stricter than a general population** because most students have attention-span challenges (see student-profile.md).

Every lab section must satisfy at least ONE of:

1. **Hands-on action** — student clicks, types, tampers, or checks a box
2. **Prediction prompt** — student is asked to guess before an answer is revealed (`.prediction-prompt`)
3. **Micro-quiz** — 1–2 question checkpoint at end of section (`.quiz-card`)
4. **Buddy switch cue** — a `.callout--tip` prompting "Rotate keyboard driver now" every ~15 min

If a section takes >5 min to read AND has no interaction, **split it or condense it**. Non-negotiable.

---

## 🧠 Pattern 1: Prediction Prompts (Highest-ROI Attention Reset)

**When to use**: before revealing any non-obvious result (payload response, tool output, exploit success, "what would this command do?").

**Component**: `.prediction-prompt` (in `components.css` + `lab-common.js`)

**Structure**:
```html
<div class="prediction-prompt">
  <div class="prediction-prompt__question">🤔 What do you think happens when we send <code>' OR 1=1--</code>?</div>
  <div class="prediction-prompt__input-group">
    <input type="text" class="prediction-prompt__input" placeholder="Your guess..." />
    <button type="button" class="prediction-prompt__btn">Reveal</button>
  </div>
  <div class="prediction-prompt__reveal" hidden>
    <span class="prediction-prompt__reveal-label">Answer</span>
    The <code>WHERE</code> clause becomes <code>username='' OR 1=1--</code> which is always true, so the DB returns all users. First row is usually admin.
  </div>
</div>
```

**Why it works**: forces cognitive commitment before information delivery. Even wrong guesses activate learning — the "prediction error" is what cements memory.

**Rule**: minimum **2 prediction prompts per lab**. Place them before the most non-obvious reveals.

---

## 🧠 Pattern 2: Info-Dense Cards (One-Glance Info Density)

**When to use**: replacing prose paragraphs OR long bullet lists (4+ same-shape items) — payload variants, tool comparison, protocol properties, port numbers.

**Component**: `.info-dense-card` (in `components.css`)

**Structure**:
```html
<div class="info-dense-card info-dense-card--accent">
  <div class="info-dense-card__title">SQLi Payload Quick Reference</div>
  <div class="info-dense-card__grid">
    <div class="info-dense-card__cell">
      <span class="info-dense-card__label">Auth bypass</span>
      <code>' OR 1=1--</code>
    </div>
    <div class="info-dense-card__cell">
      <span class="info-dense-card__label">Comment</span>
      <code>--</code> or <code>/*</code>
    </div>
    <!-- 4-6 total cells -->
  </div>
</div>
```

**Variants**: `--accent` (green), `--cyan`, `--warn`, `--danger` — pick one color per topic so students can visually cross-reference.

**Rule of thumb**: if you're writing a bullet list with 4+ items of the same shape, it should be an info-dense card. ~5:1 retention advantage over prose.

---

## 🧠 Pattern 3: The You-Are-Here Indicator (Reorient in 1 Glance)

**When to use**: every lab (auto-applied by `lab-common.js`). Persistent bottom-right pill showing current section + progress like `📍 In: Tamper the GET Request  4/13`.

**Component**: `.you-are-here` (auto-initialized — no author action needed except:)

**Author requirement**: every `<h2>` and `<h3>` in a lab must have a **stable, human-readable `id`** using kebab-case, e.g. `id="tamper-get-request"`. Not `section-0`, `section-1` (which the fallback assigns but can't be verbally referenced).

**Why**: allows the TA to say "everyone jump to `#tamper-get-request`" and students land there instantly. Students who lose focus can glance at the indicator to reorient.

---

## 🧠 Pattern 4: The QR Jump Header (Fast Onboarding)

**When to use**: top of every lab, immediately before the readiness checklist.

**Component**: `.qr-jump` (in `components.css` + auto-populated by `lab-common.js`)

**Structure**:
```html
<section class="qr-jump">
  <div class="qr-jump__code"><!-- Populated by lab-common.js --></div>
  <div class="qr-jump__body">
    <div class="qr-jump__label">📱 Follow along on your laptop</div>
    <div class="qr-jump__url"><!-- Populated by lab-common.js --></div>
    <div class="qr-jump__actions">
      <button type="button" class="qr-jump__copy-btn">Copy URL</button>
      <span class="qr-jump__hint">Scan or copy — the lab page is your second screen</span>
    </div>
  </div>
</section>
```

**Solves**: the projector-distance problem. Students who can't read the projector follow along on their own laptop.

---

## 🚫 Anti-Patterns (Hard Blockers)

| Anti-pattern | Why it fails this audience | Fix |
|---|---|---|
| **>5 min of unbroken reading** | Attention window blown | Add prediction prompt or hands-on task |
| **Auto-generated hash IDs (`#section-0`)** | Can't be verbally referenced | Use kebab-case stable IDs |
| **Bullet lists with 4+ same-shape items** | Reads as a wall | Convert to `.info-dense-card` |
| **Screenshots critical to instruction, projector-only** | Back-row can't see | Also include as inline `.burp-mock` / `.devtools-mock` |
| **Solo work blocks >15 min** | Attention decays without partner input | Insert `.callout--tip` cueing driver rotation |
| **"See the professor demo" (no artifact)** | Absent students / distracted students blocked | Every demo must have a replayable artifact in the lab page |
| **Long code blocks with no callout of key line** | Eyes glaze | Break into shorter blocks or highlight the key line |

---

## 🔍 Attention Design Audit Checklist

Before shipping any lab from Lab 03 onward:

- [ ] No section >5 min read without an interaction reset
- [ ] All `<h2>`/`<h3>` have stable kebab-case `id` attributes
- [ ] `.qr-jump` at the top of the lab (immediately before checklist)
- [ ] `.you-are-here` visible (verify by scrolling — no author action needed, auto-initialized)
- [ ] At least 2 `.prediction-prompt` blocks per lab
- [ ] Info-dense cards used wherever 4+ same-shape bullets appeared
- [ ] Driver-rotation cues at 15-min intervals (typically 3-4 per 60-min lab)
- [ ] Every projector-critical visual also in-page (no projector-only screenshots)
- [ ] Lab passes the [anti-cognitive-overload checklist](../anti-cognitive-overload/SKILL.md#the-cognitive-load-audit-checklist) as well

---

## Related Skills

- [anti-cognitive-overload](../anti-cognitive-overload/SKILL.md) — the baseline (still applies)
- [lab-authoring](../lab-authoring/SKILL.md) — manual assembly runbook
- [lab-generator](../lab-generator/SKILL.md) — automated first-pass generator that applies these patterns
