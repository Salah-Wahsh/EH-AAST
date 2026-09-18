# CCY4202: Ethical Hacking & Penetration Testing — Laboratory Portal

A static, high-performance web platform designed for 4th-year university students in **Ethical Hacking & Penetration Testing (CCY4202)**. Hosted on GitHub Pages, this platform replaces legacy PDF lab distribution with an interactive, accessible, and hacker-HUD-styled digital workspace.

🌐 **Live Portal**: [https://salah-wahsh.github.io/EH-AAST/](https://salah-wahsh.github.io/EH-AAST/)

Inspired by [AAST Labs](https://salah-wahsh.github.io/AAST/).

---

## ⚡ Key Highlights & Features

1. **"Mr. Robot" / Hacker HUD Aesthetics**:
   - Deep terminal dark canvas (`#0a0c10` / `#0d1117`) with neon cyber-green accents (`#00ff66`) and terminal cyan highlights (`#00e5ff`).
   - Interactive typing bash prompt header simulator on the portal home.
   - Code snippets formatted as macOS/Linux terminal windows with traffic-light chrome (red, yellow, green) and 1-click **Copy Command** buttons.

2. **Classroom Accessibility & Projector View**:
   - **Light/Dark Mode Toggle**: Instant switch to high-contrast obsidian-on-white palette (`#1f2328` text, `#ffffff` surface, `#0969da` links) engineered specifically to eliminate washed-out colors on low-contrast classroom projectors.
   - **Projector View Toggle (`[ 🖥️ Projector View ]`)**: Boosts base font size to 18px+ (`1.18rem`), boldens typography weights, and reinforces borders for legibility from the back row of large lecture halls.
   - All accessibility states persist automatically in `localStorage`.

3. **Curriculum & Laboratory Modules**:
   - **Module 01**: [Lab 01: Security Concepts & Web Prerequisites](labs/lab01.html)

4. **Interactive Learning & Assessment Engine**:
   - Interactive prerequisites checklists that remember completed steps across sessions.
   - Native collapsible accordions (`<details>`) for "Discussion & Thought Questions" hiding hints and answers.
   - End-of-lab interactive quizzes featuring multiple-choice questions and live terminal command input validation with instant feedback (`[+] Access Granted!` or `[-] Exploit Failed!`).
   - Global command and topic search dialog (`Ctrl+K` or `/`).

---

## 🚀 Deployment to GitHub Pages

This repository automatically publishes to GitHub Pages via `.github/workflows/deploy.yml` on every push to `main`:

- **Live URL**: [https://salah-wahsh.github.io/EH-AAST/](https://salah-wahsh.github.io/EH-AAST/)
- **Workflow**: Automated `actions/deploy-pages@v4` with zero build-step overhead.

---

## 📁 Repository Structure

```
.
├── index.html            # Course Portal Home & Bento Grid Showcase
├── cheatsheets.html      # Cheat Sheets Section (Placeholder)
├── tools.html            # Tools Setup Section (Placeholder)
├── labs/                 # Hands-On Lab Modules
│   └── lab01.html        # Module 01: Lab Architecture & Isolation
├── assets/
│   ├── css/
│   │   ├── base.css      # Design Tokens, Dark/Light Palettes, Projector Mode, Reset
│   │   ├── layout.css    # Top Navbar, Responsive Sidebar Tree, Bento Grid, Footer
│   │   └── components.css# Terminal Windows, Callouts, Quizzes, Search Dialog
│   └── js/
│       ├── site.js       # Dynamic Nav Injection, Theme & Projector State, Search Modal
│       ├── lab-common.js # Dynamic TOC, ScrollSpy, Checklist Persistence, Copy Code
│       └── quiz.js       # Interactive Quiz Engine & Answer Validation
└── README.md
```

---

## ⚖️ Academic Integrity & Legal Warning

All tools, techniques, and procedures documented in this portal are strictly for authorized educational purposes within closed, host-only laboratory networks. Attacking systems without written authorization is illegal under computer misuse statutes worldwide.
