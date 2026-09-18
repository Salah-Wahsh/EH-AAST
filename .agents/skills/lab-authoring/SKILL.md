---
name: lab-authoring
description: >-
  Standardized procedure and visual design guidelines for authoring new ethical hacking
  laboratory modules (Lab 02, Lab 03, etc.) for CCY4202 EH-AAST. Use this skill whenever
  creating, extending, or updating laboratory curriculum pages.
---

# Lab Authoring Skill: CCY4202 Ethical Hacking & Penetration Testing

This skill defines the complete lifecycle for building a new laboratory module for the CCY4202 portal. It enforces the user's **visual-first, low-verbiage, mobile-responsive** standard, ensuring students stay engaged without feeling overwhelmed by walls of text.

---

## 🎯 Core Pedagogical Requirements

1. **Visual Over Verbiage**:
   - Limit introductory theory to 1–2 sentences maximum.
   - Convey concepts using **Comparison Cards** (`.comparison-card`), **Vector SVG Diagrams**, **Threat Matrices**, and **DevTools/Terminal Mockups**.
   - No academic citation brackets (e.g. `[1-4]`).
   - No Rules of Engagement (RoE) sections.
2. **Interactive Hands-on Practice**:
   - Provide concrete terminal commands with copy buttons.
   - Include a 3–5 question client-side interactive quiz (multiple-choice + terminal challenge) using `assets/js/quiz.js`.
3. **Responsive & Classroom Projection**:
   - Mobile-first CSS ensures single-column collapse on phones (`< 768px`).
   - Compatible with `[ 🖥️ Projector View ]` (18px+ font, clean outlines) and Dark/Light mode toggles.
4. **No Gamification Bloat**:
   - Do NOT add points, XP badges, or score meters.

---

## 📋 Step-by-Step Lab Creation Runbook

### Step 1: Initialize Lab HTML File
1. Copy the reference boilerplate template:
   [examples/lab-template.html](./examples/lab-template.html) to `labs/labXX.html` (e.g., `labs/lab02.html`).
2. Update `<title>`, `<body data-active-lab="labXX">`, breadcrumbs, time estimate, and header description.
3. Configure the relative script resolver:
   ```html
   <script src="../assets/js/site.js" data-site-root=".."></script>
   <script src="../assets/js/lab-common.js"></script>
   <script src="../assets/js/quiz.js"></script>
   ```

### Step 2: Assemble Visual Sections
Consult the component guide:
[references/components-guide.md](./references/components-guide.md)

- **Readiness Checklist**: `<section class="checklist-card">` with 3–4 prerequisite checkboxes.
- **Concept Comparisons**: `<div class="comparison-grid">` comparing techniques (e.g., Active vs Passive scanning, TCP Connect vs SYN Stealth).
- **SVG Diagrams**: Responsive `<svg viewBox="...">` styled with CSS variables (`var(--color-accent)`, `var(--color-cyan)`, `var(--color-border)`).
- **Tool / Command Cards**: Code blocks wrapped in `.code-block-wrapper` with copy-to-clipboard functionality.
- **Interactive Quizzes**: `<div class="quiz-container">` containing `.quiz-card` with instant client-side feedback.

### Step 3: Register in Navigation & Search (Tri-Point Rule)
You **must** register the new lab in these three files:

1. **Sidebar Module Tree**: Edit `assets/js/lab-common.js`:
   ```javascript
   // Add lab to MODULE_TREE_DATA:
   { id: 'lab02', name: 'Lab 02: Network Reconnaissance & Port Scanning', href: 'labs/lab02.html', time: '50m' }
   ```
2. **Command Search Catalog**: Edit `assets/js/site.js`:
   ```javascript
   // Add entry to searchCatalog:
   { title: 'Lab 02: Network Reconnaissance & Port Scanning', desc: 'Nmap timing templates, SYN scan analysis, Wireshark packet capture.', url: 'labs/lab02.html', tag: 'Lab' }
   ```
3. **Portal Homepage**: Edit `index.html`:
   - Add a Bento grid card for the new lab module in the modules section.
   - Add a row in the quick-reference labs table.

### Step 4: Verification Checklist
Before pushing to production, verify:
- [ ] File opened locally or via test server (`python3 -m http.server 8000`).
- [ ] Sidebar renders and highlights the active lab.
- [ ] Search modal (`Ctrl+K`) finds the new lab.
- [ ] Projector view toggle enlarges text without overflowing elements.
- [ ] Light / Dark mode toggle works cleanly across all diagrams and cards.
- [ ] Mobile view (narrow viewport) displays single-column without horizontal scrolling.
- [ ] Quizzes provide instant pass/fail validation.

### Step 5: Automated GitHub Pages Deployment
Run:
```bash
git add .
git commit -m "feat: add Lab XX curriculum and visual exercises"
git push origin main
```
GitHub Actions workflow (`.github/workflows/deploy.yml`) will automatically build and publish the changes to GitHub Pages in ~20 seconds.
