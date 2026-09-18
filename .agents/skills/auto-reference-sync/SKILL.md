---
name: auto-reference-sync
description: >-
  Automated harvesting and synchronization of new commands, tools, and installation steps
  into cheatsheets.html, tools.html, and site.js search catalog during lab creation and
  curriculum updates. Eliminates manual documentation overhead for the instructor.
---

# Auto-Reference Sync Skill: CCY4202 Portal

This skill enforces the user's **Zero-Manual-Overhead Directive**:
> *"I want this to be auto-added in the cheat sheet and the installation tools... I don't have to specifically write in this section. I want this to be added and maintained automatically from your end while I create the labs."*

Whenever an agent creates, modifies, or extends a lab (e.g. `labs/lab02.html`), this skill **must automatically execute** to extract all new technical artifacts and seamlessly sync them across the portal.

---

## 🔄 The 3-Step Auto-Harvesting Pipeline

```
[ Lab Authoring / Update ]
       │
       ├── 1. Command Extractor  ──►  Append to cheatsheets.html (Categorized Table + Copy Button)
       │
       ├── 2. Tool Extractor     ──►  Append to tools.html (Tool Setup Card + Install + Verify)
       │
       └── 3. Catalog Extractor  ──►  Append to assets/js/site.js (searchCatalog Array)
```

---

## Step 1: Harvest Commands into `cheatsheets.html`

When a new lab introduces terminal commands or flags (e.g., `nmap -sS -sV`, `curl -I`, `hydra -l admin`, `sqlmap -u`):

1. **Check for Duplicates**: Inspect `cheatsheets.html` to see if the command already exists.
2. **Assign Category**:
   - `Reconnaissance & Port Scanning` (e.g., `nmap`, `masscan`, `arp-scan`).
   - `Web Application Auditing` (e.g., `curl`, `ffuf`, `gobuster`, DevTools).
   - `Payloads & Data Encoding` (e.g., `base64`, `xxd`, URL encoding).
   - `Exploitation & Frameworks` (e.g., `msfconsole`, `searchsploit`, `sqlmap`).
   - `Listeners & Reverse Shells` (e.g., `nc -lvnp`, `bash -i`).
3. **Format Standard**:
   Add a row to the respective category table:
   ```html
   <tr>
     <td>
       <div class="code-copy-inline">
         <code>[exact-command]</code>
         <button class="terminal-copy-btn" onclick="navigator.clipboard.writeText('[exact-command]')">Copy</button>
       </div>
     </td>
     <td><strong>[Short Purpose]</strong></td>
     <td><span class="flag-pill">[Flag 1]</span> [Meaning], <span class="flag-pill">[Flag 2]</span> [Meaning]</td>
     <td><a href="[lab-link]" class="badge-lab-ref">Lab XX</a></td>
   </tr>
   ```

---

## Step 2: Harvest Tools into `tools.html`

When a lab introduces a new tool, service, or target container (e.g., `hydra`, `gobuster`, `sqlmap`, `nikto`):

1. **Check for Duplicates**: Inspect `tools.html` to verify the tool isn't already documented.
2. **Generate Tool Setup Card**:
   ```html
   <div class="tool-setup-card">
     <div class="tool-setup-card__header">
       <div style="display:flex;align-items:center;gap:var(--space-2);">
         <span class="tool-icon">[Icon]</span>
         <h3 class="tool-title">[Tool Name]</h3>
       </div>
       <span class="comparison-badge" style="color:var(--color-accent);">[Category Badge]</span>
     </div>
     <p class="tool-desc">[1-sentence description of the tool's offensive/defensive purpose].</p>
     
     <div class="tool-setup-steps">
       <div class="tool-step">
         <span class="tool-step-label">Installation / Pull</span>
         <pre><code>sudo apt update && sudo apt install -y [package-name]</code></pre>
       </div>
       <div class="tool-step">
         <span class="tool-step-label">Verification Command</span>
         <pre><code>[tool-binary] --version</code></pre>
       </div>
     </div>
     <div class="tool-footer">
       <span>Introduced in: <a href="[lab-link]">[Lab Title]</a></span>
     </div>
   </div>
   ```

---

## Step 3: Register in Search Index (`assets/js/site.js`)

Add the newly harvested tools and cheat sheet categories into `searchCatalog` in `assets/js/site.js`:

```javascript
{ title: '[Tool/Command Name]', desc: '[Quick purpose and flags]', url: 'cheatsheets.html#[anchor-or-category]', tag: 'CheatSheet' },
{ title: '[Tool Setup: Tool Name]', desc: 'Installation and verification for [Tool Name].', url: 'tools.html#[anchor]', tag: 'Tool' }
```

---

## ⚡ Execution Guarantee
Agents are **strictly prohibited** from asking the instructor to provide or manually update `cheatsheets.html` or `tools.html`. All tools and commands introduced in any lab must be harvested and synchronized automatically during that same session.
