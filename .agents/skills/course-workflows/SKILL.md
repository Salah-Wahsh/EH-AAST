---
name: course-workflows
description: >-
  Standard operating runbooks for CCY4202: populating cheat sheets, setting up tools guides,
  updating search catalogs, and deploying to GitHub Pages. Use when the user requests
  content for cheatsheets, tools setup, or platform operations.
---

# Course Workflows: CCY4202 Ethical Hacking Portal

This skill provides operational runbooks for expanding non-lab sections of the platform (`cheatsheets.html`, `tools.html`) and managing production deployments.

---

## 📖 Runbook 1: Populating `cheatsheets.html`

When the user requests adding offensive security cheat sheets:

1. **Structure by Attack Category**:
   - Network Scanning & Host Discovery (`nmap`, `masscan`, `arp-scan`).
   - Web Enumeration & Interception (`curl`, `ffuf`, `gobuster`, `nikto`).
   - Privilege Escalation (`sudo -l`, SUID discovery, LinPEAS).
   - Shell Spawning & Reverse Shells (`nc`, `bash`, `python3 pty`).
2. **Component Pattern**:
   Use visual command tables with inline `<pre><code>` blocks and `.code-copy-btn` for 1-click clipboard copying:
   ```html
   <div class="table-container">
     <table class="data-table">
       <thead>
         <tr>
           <th>Command</th>
           <th>Purpose</th>
           <th>Flags Breakdown</th>
         </tr>
       </thead>
       <tbody>
         <tr>
           <td><code>nmap -sS -sV -p- -T4 &lt;target&gt;</code></td>
           <td>Full TCP port scan with service detection</td>
           <td><code>-sS</code> SYN, <code>-sV</code> Version, <code>-p-</code> All ports, <code>-T4</code> Aggressive timing</td>
         </tr>
       </tbody>
     </table>
   </div>
   ```
3. **Register in Search Index**:
   Update `searchCatalog` in `assets/js/site.js` with individual cheatsheet topics so students can hit `Ctrl+K` and jump straight to the exact section.

---

## 🛠️ Runbook 2: Populating `tools.html`

When the user requests adding environment and tools setup documentation:

1. **Standard Lab Network Architecture**:
   - Isolated Host-Only Network: `192.168.56.0/24`.
   - Attack VM: Kali Linux Rolling (x86_64).
   - Target VM: Metasploitable3 / OWASP Juice Shop / DVWA.
2. **Tool Setup Cards**:
   Provide visual setup cards containing:
   - Tool badge (e.g. `Network Scanner`, `Web Proxy`, `Packet Analyzer`).
   - Quick install snippet (`apt-get install ...` or `docker run ...`).
   - Verification command (`tool --version` or healthcheck).
   - Expected terminal output.
3. **Search Indexing**:
   Add tools (e.g., Burp Suite, Nmap, Wireshark, Metasploit) into `assets/js/site.js` search catalog.

---

## 🚀 Runbook 3: GitHub Pages Deployment & Healthcheck

Whenever updating the portal:

1. **Verify Git Tree**:
   ```bash
   git status
   ```
2. **Commit with Conventional Messages**:
   - Labs: `feat(lab): add Lab XX [topic]`
   - Cheatsheets: `feat(cheatsheet): add [tool/topic] cheat sheet`
   - Fixes: `fix: [issue]`
   - Docs: `docs: [update]`
3. **Push to Main**:
   ```bash
   git push origin main
   ```
4. **Inspect Automated GitHub Action Run**:
   ```bash
   gh run list --limit 1
   ```
5. **Verify Live Production Endpoint**:
   ```bash
   curl -sI https://salah-wahsh.github.io/EH-AAST/ | head -n 5
   ```
