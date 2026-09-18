# UI Component Reference: CCY4202 Lab Design System

This guide documents the ready-to-use HTML/CSS visual components in `assets/css/components.css`. Use these patterns to build clean, visual-first lab content without inventing ad-hoc styles.

---

## 1. Comparison Grid (`.comparison-grid`)
Used to contrast two security concepts side-by-side (e.g., Vulnerability Assessment vs. Pentest, GET vs. POST, Active vs. Passive).

```html
<div class="comparison-grid">
  <!-- Left Card (Defensive/Standard - Cyan) -->
  <div class="comparison-card comparison-card--cyan">
    <div class="comparison-card__header">
      <h3 class="comparison-card__title">
        <span class="comparison-icon">📋</span> Vulnerability Assessment
      </h3>
      <span class="comparison-badge" style="color:var(--color-cyan);border-color:rgba(0,229,255,0.4);">BREADTH</span>
    </div>
    <ul class="comparison-list">
      <li><span class="comparison-icon">🎯</span> <strong>Objective:</strong> Catalog flaws without exploitation.</li>
      <li><span class="comparison-icon">⚙️</span> <strong>Method:</strong> Automated scans.</li>
    </ul>
  </div>

  <!-- Right Card (Offensive/Exploitative - Green Accent) -->
  <div class="comparison-card comparison-card--accent">
    <div class="comparison-card__header">
      <h3 class="comparison-card__title">
        <span class="comparison-icon">🎯</span> Penetration Test
      </h3>
      <span class="comparison-badge" style="color:var(--color-accent);border-color:rgba(0,255,102,0.4);">DEPTH</span>
    </div>
    <ul class="comparison-list">
      <li><span class="comparison-icon">🎯</span> <strong>Objective:</strong> Prove compromise and business impact.</li>
      <li><span class="comparison-icon">💥</span> <strong>Method:</strong> Adversarial simulation & weaponization.</li>
    </ul>
  </div>
</div>
```

---

## 2. Threat Actor Grid (`.threat-matrix`)
Used to display threat actors or tool categorizations with color-coded borders and risk gauges.

```html
<div class="threat-matrix">
  <div class="threat-card threat-card--ethical">
    <div class="threat-card__badge">WHITE HAT</div>
    <h3 class="threat-card__title">Ethical Hacker</h3>
    <p class="threat-card__desc">Authorized defense simulator operating under explicit rules.</p>
    <div class="threat-card__meter">
      <span class="threat-card__meter-label">Risk Level:</span>
      <div class="threat-card__meter-bar"><div style="width:10%;background:var(--color-accent);"></div></div>
    </div>
  </div>

  <div class="threat-card threat-card--gray">
    <div class="threat-card__badge">GRAY HAT</div>
    <h3 class="threat-card__title">Independent Researcher</h3>
    <p class="threat-card__desc">Unsolicited probing without authorization; may disclose responsibly.</p>
    <div class="threat-card__meter">
      <span class="threat-card__meter-label">Risk Level:</span>
      <div class="threat-card__meter-bar"><div style="width:60%;background:#ffaa00;"></div></div>
    </div>
  </div>

  <div class="threat-card threat-card--black">
    <div class="threat-card__badge">BLACK HAT</div>
    <h3 class="threat-card__title">Malicious Actor</h3>
    <p class="threat-card__desc">Unauthorized exploitation for financial extortion or espionage.</p>
    <div class="threat-card__meter">
      <span class="threat-card__meter-label">Risk Level:</span>
      <div class="threat-card__meter-bar"><div style="width:100%;background:#ff3366;"></div></div>
    </div>
  </div>
</div>
```

---

## 3. Responsive SVG Diagram Card (`.diagram-card`)
Containers for flowcharts, packet sequences, or network topologies.

```html
<div class="diagram-card">
  <div class="diagram-card__header">
    <div class="diagram-card__title">
      <span>📊</span> TCP 3-Way Handshake Connection Sequence
    </div>
    <span class="diagram-card__tag">RFC 793 Protocol Flow</span>
  </div>
  <svg class="diagram-svg" viewBox="0 0 900 240" xmlns="http://www.w3.org/2000/svg" role="img">
    <!-- Use CSS variables: var(--color-accent), var(--color-cyan), var(--color-surface), var(--color-border) -->
  </svg>
</div>
```

---

## 4. Browser DevTools Mockup (`.devtools-window`)
Used for HTTP inspections, cookies, payloads, and web parameter analysis.

```html
<div class="devtools-window">
  <div class="devtools-window__header">
    <div class="devtools-window__dots">
      <span class="devtools-window__dot red"></span>
      <span class="devtools-window__dot yellow"></span>
      <span class="devtools-window__dot green"></span>
    </div>
    <div class="devtools-window__tabs">
      <button class="devtools-tab">Elements</button>
      <button class="devtools-tab">Console</button>
      <button class="devtools-tab is-active">Network</button>
      <button class="devtools-tab">Application</button>
      <button class="devtools-tab">Security</button>
    </div>
  </div>
  <div class="devtools-window__body">
    <!-- DevTools inspection rows, request/response headers, status codes -->
  </div>
</div>
```

---

## 5. Interactive Quiz Question (`.quiz-card`)
Multiple-choice questions with instant client-side feedback validated by `assets/js/quiz.js`.

```html
<div class="quiz-card" data-question-id="q-unique-id">
  <div class="quiz-header">
    <span class="quiz-badge">QUESTION 1</span>
    <div class="quiz-title">What is the primary difference between a Vulnerability Assessment and a Penetration Test?</div>
  </div>
  <div class="quiz-options">
    <button class="quiz-option" data-correct="false" data-feedback="VA focuses on breadth without exploitation.">
      <span class="quiz-option__letter">A</span>
      <span>A Vulnerability Assessment executes active exploits, while a Penetration Test only runs port scans.</span>
    </button>
    <button class="quiz-option" data-correct="true" data-feedback="Vulnerability assessments catalogue flaws broadly; penetration tests actively exploit them to demonstrate impact.">
      <span class="quiz-option__letter">B</span>
      <span>A Vulnerability Assessment identifies and prioritizes flaws without exploitation; a Penetration Test actively attempts exploitation.</span>
    </button>
  </div>
  <div class="quiz-feedback" aria-live="polite"></div>
</div>
```

---

## 6. Terminal Command Challenge (`.quiz-card` with `.quiz-input-group`)

```html
<div class="quiz-card" data-question-id="q-cmd-unique">
  <div class="quiz-header">
    <span class="quiz-badge">CHALLENGE</span>
    <div class="quiz-title">Grab only the HTTP response headers for target.local</div>
  </div>
  <div class="quiz-body">
    <p>Construct the single <code>curl</code> command with the header-only flag:</p>
    <div class="quiz-input-group">
      <span class="quiz-prompt">root@kali:~#</span>
      <input type="text" class="quiz-input" placeholder="curl ..." data-expected-command="curl -I target.local" />
      <button class="quiz-submit-btn" onclick="QuizEngine.handleCommandSubmit(this.closest('.quiz-card'))">Submit</button>
    </div>
  </div>
  <div class="quiz-feedback" aria-live="polite"></div>
</div>
```
