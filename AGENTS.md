# CCY4202: Ethical Hacking & Penetration Testing — Agent Rules & Memory

This repository hosts the static, student-facing lab portal for **CCY4202: Ethical Hacking & Penetration Testing** (AAST).
- **Production URL**: `https://salah-wahsh.github.io/EH-AAST/`
- **GitHub Repository**: `https://github.com/Salah-Wahsh/EH-AAST`
- **Deployment**: Automated via GitHub Actions on every push to `main` (`.github/workflows/deploy.yml`).

---

## 🚫 Hard Prohibitions (User Directives)

The user has explicitly commanded the following constraints across all sessions. **NEVER violate or re-introduce any of these:**

1. **❌ NO CRT / Retro Scanline Overlay**:
   - CRT mode, retro phosphor effects, and scanline toggles were explicitly removed by user request. Do not add CRT effects or CRT toggles.
2. **❌ NO GitHub Link in the Navbar**:
   - Keep the navbar clean. The repository link is excluded from the top header navigation.
3. **❌ NO Syllabus in Navigation**:
   - The top navbar only contains: `Portal Home`, `Labs`, `Cheat Sheets`, and `Tools Setup`. Do not add a Syllabus item.
4. **❌ NO Points, XP, or Gamification Counters**:
   - Do not display XP points, leaderboards, student badges, or gamified score counters. The platform focuses strictly on academic clarity and hands-on skill.
5. **❌ NO Academic Citation Brackets**:
   - Do not use academic bibliography reference brackets (e.g. `[1-4]`, `[5, 6]`). Keep explanations direct, technical, and immediately usable.
6. **❌ NO "Pre-Engagement & Legal Rules of Engagement (RoE)" Section**:
   - The user explicitly removed this section. Do not include RoE modules in lab curricula.
7. **❌ NO Fabricated Filler in Cheat Sheets or Tools**:
   - `cheatsheets.html` and `tools.html` are deliberately kept clean placeholders until the user provides specific content. Do not generate unrequested filler content for them.

---

## 🎨 Visual-First & Content Presentation Standards

The user's core pedagogical philosophy:
> *"Reduce the content written in words and focus more on visuals and comparisons and stuff like that... too much content written will make them feel overwhelmed and annoyed."*

1. **Low-Verbiage, High-Impact Visuals**:
   - Never output walls of descriptive prose. Keep theoretical context to 1–2 crisp sentences.
   - Transform concepts into **Comparison Cards** (`.comparison-grid`), **Vector Diagrams**, and **Step Matrices**.
   - Use color-coded comparison cards (`.comparison-card--cyan` for defensive/broad, `.comparison-card--accent` for offensive/deep).
2. **Self-Contained Inline Vector SVGs**:
   - Build flowcharts, sequence diagrams, and architecture pipelines using responsive `<svg>` tags styled with CSS variables (`var(--color-accent)`, `var(--color-cyan)`, `var(--color-surface)`).
   - This guarantees dark/light/projector theme compatibility and zero broken external image links.
3. **Mobile-First Responsiveness**:
   - Ensure all layouts adapt cleanly to smartphone viewports (`< 768px`).
   - Comparison grids and cards must wrap to single-column (`grid-template-columns: 1fr`).
   - Terminal snippets and code blocks must have `overflow-x: auto` and maintain full-width visibility without horizontal window blowout.
4. **Classroom & Lecture Hall Readiness**:
   - **Projector View**: Maintained via `ThemeManager.toggleProjector()` (`body.projector-mode`), enforcing 18px+ high-contrast readable typography.
   - **Light / Dark Theme**: Persisted in `localStorage` (`ccy_theme`).
5. **Hero Terminal Simulation**:
   - Preserve the bash initialization log terminal on `index.html` (`[*] Initializing CCY4202 Ethical Hacking Laboratory Suite...`). The user explicitly instructed to leave this in place.

---

## 🏗️ Architecture & Path Standards

1. **Zero External Build Steps**:
   - Pure native web standards: semantic HTML5, modern CSS3 (Custom Properties, Flexbox, CSS Grid), and lightweight ES6.
   - No `npm`, `node_modules`, bundlers, or heavy UI frameworks.
2. **Dynamic Relative Path Resolution**:
   - Root pages (`index.html`, `cheatsheets.html`, `tools.html`) declare:
     ```html
     <script src="assets/js/site.js" data-site-root="."></script>
     ```
   - Subdirectory lab pages (`labs/lab01.html`, `labs/lab02.html`) declare:
     ```html
     <script src="../assets/js/site.js" data-site-root=".."></script>
     ```
   - Navigation links use `data-site-href="path"` which `site.js` resolves dynamically. This ensures identical functionality on:
     - Local file browsing (`file://`)
     - Local testing server (`http://localhost:8000/`)
     - GitHub Pages subpath (`https://salah-wahsh.github.io/EH-AAST/`)

---

## 🧪 Registering New Labs (Tri-Point Rule)

Whenever creating a new lab (e.g. `labs/lab02.html`):
1. **Lab Common Module Tree**: Add the lab entry to `MODULE_TREE_DATA` in `assets/js/lab-common.js`.
2. **Search Catalog**: Add search indexing entry to `searchCatalog` in `assets/js/site.js`.
3. **Home Portal**: Add featured Bento card and table entry in `index.html`.
4. **Deploy**: Commit and push to `main` to trigger the automated GitHub Actions deployment.
