# MASTER CONTEXT & SYSTEM DIRECTIVE FOR ETHICAL HACKING LABS

> **Source of truth for pedagogical philosophy, curriculum plan, and student profile.**
> Authored by Salah (course TA). Referenced by all lab-authoring agents.
> Do **not** duplicate this content into Claude memory — read this file on demand.

---

## 1. TEACHER PROFILE & COURSE OVERVIEW

- **Role**: Teaching Assistant (TA) named Salah for a 4th-year university course in "Ethical Hacking & Penetration Testing".
- **Goal**: Create a centralized, highly engaging static course website hosted on GitHub Pages (built using Antigravity IDE) to replace traditional PDF labs and deliver a top-notch practical experience.
- **Course Website Reference**: Inspired by previous course platforms (`https://salah-wahsh.github.io/AAST/` and `https://salah-wahsh.github.io/EH-AAST/labs/lab01.html`).

---

## 2. PROFESSOR'S DIRECTIVE & AGREEMENT

- **Voice Note Consensus**: Reached out to the course professor via WhatsApp proposing a 100% hands-on approach starting with Web Attacks to boost student engagement.
- **Professor's Exact Words**: *"الله يسلمك الله يخليك الحمد لله.. احنا هنبدأ بالـ Ethical Hacking، يعني ادخل شوف أي Online Academy بتقدم Hacking course وهناخد الـ Hands-on بتاعه كله."*
- **Takeaway**: Absolute freedom and green light to run 100% practical labs, front-load Web Hacking/Attacks, and leverage online academy materials (PortSwigger, TryHackMe, OWASP Juice Shop).

---

## 3. STUDENT PROFILE & PEDAGOGICAL CONSTRAINTS

- **Target Audience**: 4th-year Computer Science / Cybersecurity undergraduates.
- **Knowledge Baseline**: They have taken prerequisite courses (Databases, Computer Networks, Web Development, OS), but their knowledge is **weak, basic, and purely abstract**. They do NOT have deep practical familiarity with DevTools, database queries, HTTP headers, or network protocols.
- **Engagement Trigger**: They get bored easily by dry theory (like 4 weeks of passive recon lookups). They need immediate, hands-on satisfaction.
- **The "Prerequisite Refresher" Rule**: Before explaining ANY vulnerability, ALWAYS provide a brief 5-minute refresher on how the underlying technology works normally (e.g., explain relational DB tables & SQL syntax before SQL Injection; explain DOM & cookies before XSS).
- **The "Visuals Over Text" Rule**: Students absorb information much better through visuals. ALWAYS prioritize ASCII architecture diagrams, flowcharts, side-by-side code blocks, and structured comparison tables over dense walls of text.

---

## 4. CURRICULUM STRATEGY & NAVIGATION

- **Navigation Strategy ("Skip & Navigate")**: We open Lab 1 by explaining the 5 Phases of Penetration Testing / Cyber Kill Chain. At Week 2, we explicitly navigate them: *"We are jumping straight to Phase 3 (Exploitation & Web Attacks) first for immediate hands-on experience, and will loop back to Phase 1 & 2 (Recon & Scanning) afterward."* (Avoids hybrid "hook-and-bridge" confusion while maintaining structural context).
- **Dual Lab Platform Strategy**:
  1. **OWASP Juice Shop**: Real-world, modern Single-Page Application (Node/Express/Angular) used for TA live demos and gamified student scoreboard challenges.
  2. **PortSwigger Web Security Academy**: Free, isolated 10-minute micro-labs used during section time for step-by-step hands-on practice with Burp Suite.

---

## 5. RECOMMENDED 14-WEEK SEMESTER TIMELINE

| Week | Phase | Topic & Lab Focus | Hands-On Target & Online Platform |
| :--- | :--- | :--- | :--- |
| **W01** | **Foundations** | **Course Intro, RoE & Web Prerequisites**<br />• Legal frameworks, HTTP headers, DevTools interception, Base64 decoding, `cURL` banner grabbing. | • Browser DevTools & Terminal<br />• *Source: Lab 01 - EH AAST* |
| **W02** | **Web Security** | **Web Application Basics & Burp Suite**<br />• Intercepting, modifying, and repeating HTTP GET/POST requests; scope configuration. | • **OWASP Juice Shop** & **PortSwigger**: *Burp Suite Basics* |
| **W03** | **Web Security** | **SQL Injection (SQLi) & Automation**<br />• DB Refresher, in-band UNION-based SQLi, auth bypass, and automated DB dumping using `sqlmap`. | • **OWASP Juice Shop** & **PortSwigger**: *SQL Injection Labs* |
| **W04** | **Web Security** | **Cross-Site Scripting (XSS) & Cookie Theft**<br />• DOM/Cookie Refresher, Reflected and Stored XSS, auditing `HttpOnly` flags, stealing session cookies. | • **OWASP Juice Shop** & **PortSwigger**: *XSS Labs* |
| **W05** | **Web Security** | **Broken Access Control & File Upload Flaws**<br />• IDOR, parameter tampering, uploading PHP web shells, OS command execution. | • **OWASP Juice Shop** & **PortSwigger**: *File Upload & Command Injection* |
| **W06** | **Network Recon** | **Passive Reconnaissance & OSINT**<br />• Footprinting domains using `WHOIS`, `dig`, DNS zone transfers, Shodan, and Google Dorks. | • **TryHackMe**: *Passive Reconnaissance / OSINT* |
| **W07** | **Network Recon** | **Active Scanning & Network Enumeration**<br />• TCP 3-Way Handshake, Nmap SYN stealth scans (`-sS`), UDP scans, and NSE vulnerability scripts. | • **TryHackMe**: *Nmap & Network Enumeration* |
| **W08** | **Traffic Analysis** | **Network Sniffing & ARP Poisoning**<br />• Packet analysis in Wireshark, active sniffing with `Ettercap`, ARP spoofing, and SSL stripping. | • Wireshark & `ettercap` on Kali VM |
| **W09** | **Vulnerability Mgmt** | **Vulnerability Assessment & CVSS Analysis**<br />• Running Nessus/Qualys scans, interpreting reports, calculating CVSS v2/v3 base scores. | • Local Nessus Scanner on Metasploitable 2 |
| **W10** | **Exploitation** | **System Exploitation & Metasploit**<br />• MSFConsole, auxiliary scanners, weaponizing MS08-067, spawning reverse TCP shells. | • **TryHackMe**: *Metasploit Intro* |
| **W11** | **Exploitation** | **Client-Side Attacks & Social Engineering**<br />• Social-Engineer Toolkit (SET), `msfvenom` payload generation, PDF/Office malicious attachments. | • Social-Engineer Toolkit (SET) on Kali |
| **W12** | **Post-Exploit** | **Post-Exploitation & Meterpreter**<br />• Situational awareness commands, privilege escalation (`getsystem`, LinPEAS), dumping SAM hashes. | • **TryHackMe**: *Post-Exploitation Basics* |
| **W13** | **Post-Exploit** | **Pivoting & Active Directory Basics**<br />• Port forwarding, SSH tunneling, autoroute via Meterpreter, pivoting into internal subnets. | • **TryHackMe**: *Network Pivoting* |
| **W14** | **Capstone** | **Final Capstone CTF & Technical Reporting**<br />• Compromising a target machine from discovery to root shell; writing an executive & technical report. | • Final Lab Machine (VulnHub / THM) |

---

## 6. WEBSITE DESIGN & UI REQUIREMENTS

- **Aesthetic**: "Mr. Robot" / Hacker HUD vibe with terminal fonts (`JetBrains Mono` / `Fira Code`).
- **Dark Mode / Light Mode**: Default dark theme with neon green/cyan accents; clean light mode for daytime reading.
- **Projector View (CRITICAL)**: A high-contrast toggle button (`[ 🖥️ Projector Mode ]`) that boosts base font sizes to 18px+, sharpens borders, and boldens text so students sitting in the back row of a large lecture hall can easily read terminal commands and code snippets.

---

## 7. TA CONCERNS & FEARS

1. **Fear of Student Disorganization**: Dislikes overly blended or disorganized topics. Needs a clear roadmap so students always know which phase of the penetration testing lifecycle they are executing.
2. **Fear of Unspoken Knowledge Gaps**: Worries that students will blindly execute exploit commands without understanding *why* or *how* the bug exists due to weak prerequisite background.
3. **Fear of Low Engagement**: Worries that traditional textbook order will make students lose interest early in the semester.

---

## 8. AI COLLABORATOR ROLE

Whenever asked to draft content, create a lab, or design a module for this course:

- Maintain this exact persona and respect all pedagogical rules.
- Always include **background technology refreshers**, **ASCII diagrams**, **DevTools/Terminal commands**, **side-by-side secure vs. insecure code**, and **links/exercises for PortSwigger and OWASP Juice Shop**.
- Keep tone clear, confident, and conversational, like a senior talking to the room, with a light dry humor. Never AI-sounding (no em dashes, no hype words). See [`human-voice`](../skills/human-voice/SKILL.md).
