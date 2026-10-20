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

## 5. 14-WEEK SEMESTER TIMELINE (v2, adopted 2026-10-19)

> Rationale, benchmark, and sources: [`curriculum-plan-v2.md`](curriculum-plan-v2.md).
> Design bar: eJPT / CPTS entry-level practical skill. Depth over breadth: four phases taught
> properly (Web → Network/System → Active Directory → Deliver), not a topic sampler. Back half
> runs on **TryHackMe** (browser / light VPN), not a heavy local VM lab.

| Week | Phase | Topic & Lab Focus | Hands-On Target & Online Platform |
| :--- | :--- | :--- | :--- |
| **W01** | **Foundations** | **Course Intro & Web Prerequisites**<br />• How the web works, HTTP, DevTools interception, Base64, the pentest methodology spine, legal basics. | • Browser DevTools<br />• *Lab 01* |
| **W02** | **Web** | **Web App Basics & Burp Suite**<br />• Intercept, modify, repeat HTTP requests; app mapping / recon; scope. | • **Juice Shop** & **PortSwigger**: *Burp Basics* |
| **W03** | **Web** | **Injection (SQLi + command injection)**<br />• DB refresher, auth bypass, error-based, UNION extraction, `sqlmap`. OWASP A05. | • **Juice Shop** & **PortSwigger**: *SQLi* |
| **W04** | **Web** | **XSS & Session/Cookie Theft**<br />• DOM/cookie refresher, reflected + stored XSS, `HttpOnly`, stealing sessions. Client-side. | • **Juice Shop** & **PortSwigger**: *XSS* |
| **W05** | **Web** | **Broken Access Control: IDOR / BOLA / Auth Bypass**<br />• Forced browsing, parameter tampering, object-level auth. OWASP A01 (and API #1). | • **Juice Shop** & **PortSwigger**: *Access Control* |
| **W06** | **Web → System** | **Security Misconfig & File Upload to Web Shell**<br />• Misconfig, upload filters, a working PHP web shell, content-type / polyglot bypass, OS command injection. The bridge from web into the OS. OWASP A02. | • **PortSwigger**: *File Upload* (real Apache/PHP) is the spine. Juice Shop's upload bugs are different (XXE / Zip Slip / API) and suit a TA demo only. |
| **W07** | **Network** | **Recon, Scanning & Enumeration**<br />• The promised loop-back to Phase 1-2. Nmap, service identification, enumeration. | • **TryHackMe**: *Nmap / Enumeration* |
| **W08** | **System** | **Service Exploitation & Initial Access**<br />• Finding and running an exploit, getting a first shell, Metasploit as a tool not a crutch. | • **TryHackMe**: *Exploitation* |
| **W09** | **System** | **Privilege Escalation**<br />• Linux privesc is the hands-on core (SUID, `sudo -l`, cron, PATH, LinPEAS). Windows privesc (services, tokens, `SeImpersonate`, WinPEAS) is the 🔴 + take-home track, revisited on domain hosts in the AD block. | • **TryHackMe**: *Linux/Windows Privesc* |
| **W10** | **Active Directory** | **AD Foundations & Enumeration**<br />• How a domain is laid out, users/groups/trusts, BloodHound, finding attack paths. | • **TryHackMe**: *AD* |
| **W11** | **Active Directory** | **AD Attacks**<br />• Kerberoasting, AS-REP roasting, pass-the-hash, NTLM relay. | • **TryHackMe**: *AD* |
| **W12** | **Active Directory** | **Lateral Movement & Post-Exploitation**<br />• Pivoting, credential dumping, moving toward domain compromise. | • **TryHackMe**: *AD / Post-Ex* |
| **W13** | **Deliver** | **Reporting & the Engagement Lifecycle**<br />• Turn the semester's Findings Log into one real report. CVSS, executive vs technical. | • The course's own Findings Log |
| **W14** | **Capstone** | **Final Capstone CTF + Report**<br />• Compromise a target end to end (discovery to root), then write it up properly. | • Final box (VulnHub / TryHackMe / HTB) |

**Reporting is a thread, not just W13:** every lab from Lab 02 on ends with one written finding
(Findings Log), so the W13 report and W14 capstone are the drip made whole.

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
- A lab, taken as a whole, should carry: a **background technology refresher** (at the opening), **visuals** (roomy HTML tables/cards, inline SVG only for genuine diagrams, per [`lab-visuals-readable`] in the standard), **DevTools/Terminal commands**, **side-by-side secure vs. insecure code** (at the remediation/finding step), and **PortSwigger / Juice Shop exercises**. Distribute these across the lab. Do **not** force all of them into every section, and obey [`section-authoring`](../skills/section-authoring/SKILL.md) and [`anti-cognitive-overload`](../skills/anti-cognitive-overload/SKILL.md) per section.
- Keep tone clear, confident, and conversational, like a senior talking to the room, with a light dry humor. Never AI-sounding (no em dashes, no hype words). See [`human-voice`](../skills/human-voice/SKILL.md).
