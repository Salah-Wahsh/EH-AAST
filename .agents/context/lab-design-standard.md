# Lab Design Standard v2 — The "Professional Program" Upgrade

> **Status:** Approved 2026-09-29. Piloting on **Lab 03 (SQL Injection)**.
> **Author:** Salah (TA), with agent as co-designer.
> **Scope:** Applies to every lab from Lab 03 onward. Labs 01–02 stay as-is unless we backport.

This file records *why* we changed the lab format and *what* the new format is, so any future
session (any LLM) can pick up mid-semester without re-deriving the plan. Read it alongside
[`master-context.md`](master-context.md) and the `lab-generator` / `attention-design` skills.

---

## Why we changed

Two things pushed this:

1. **Mixed-level room.** In Lab 02, a strong student said it was easy while weaker students
   still need the guided path. One difficulty can't serve both ends of a 50–60 person hall.
2. **Career-grade, not disposable.** Salah wants students to leave with transferable skill
   (methodology, reporting, framework vocabulary), not payloads they forget after finals.

Assessment of where the course stood: hands-on-first + Juice Shop/PortSwigger + prereq
refreshers is already modern and correct. The gaps vs. how real training programs
(OffSec, HTB Academy, SANS, TCM) and university tracks run were three: no explicit
**methodology spine**, **reporting only at the W14 capstone**, and **one difficulty for everyone**.

---

## What v2 adds (four things, on top of the existing skill system)

The existing rules still hold in full: anti-cognitive-overload caps, human-voice, attention
resets every 5–7 min, tri-point registration, auto-reference-sync, the content-audit gate,
and the instructor briefing. v2 layers these on:

### 1. Three depth tiers per exercise (extends the old Baseline/Stretch)
- 🟢 **Baseline** — the guided win. Everyone finishes. Nobody leaves without the wow moment.
- 🟡 **Stretch** — same vuln, training wheels off. The average student is challenged.
- 🔴 **Going Pro** — career-grade extension: manual exploitation with no tool, filter/WAF
  bypass, chaining two bugs, or writing the CVSS. This is where "this is easy" goes to die.
- **"Why it works" accordions** stay, aimed at the weaker student catching up asynchronously.

Same lab, three exits. This is the direct fix for the mixed-level room.

### 2. A methodology spine
Teach one lightweight web-pentest process, then repeat it every lab so it becomes muscle memory:

> **Recon → Map → Identify → Exploit → Document**

Aligned to OWASP WSTG and PTES. Each lab section is tagged with which step it belongs to, so
students always know where they are in a *repeatable process*, not just which tool they're on.

### 3. One written finding per lab
Extends Lab 02's Findings Log. Every web lab ends with the student writing **one** finding
properly: title, severity/CVSS, affected endpoint, steps to reproduce, impact, remediation.
The deliverable is the report, not the shell. This is the #1 thing juniors can't do, and pros
do it every engagement. Full report writing still lives at the W14 capstone; this is the drip.

### 4. Explicit career/framework tags per lab
A small header band that maps the lab to the professional world, making the payoff visible:
- **OWASP Top 10** item (e.g. A03: Injection)
- **MITRE ATT&CK** technique ID (e.g. T1190 Exploit Public-Facing Application)
- **CEH domain** — for the Egyptian HR filter (banks, telecoms, EG-CERT, ministries screen for CEH)
- **Cert it builds toward** — eJPT / PNPT / BSCP / OSCP (what proves skill to technical interviewers)

---

## Materials policy

Real annotated screenshots are welcome and encouraged (a real Burp screenshot beats an abstract
diagram). Capture our **own** screenshots from Burp/browser against Juice Shop and PortSwigger.
Do **not** hotlink Google/PNG images: they break and carry license risk. Official reusable
diagrams (OWASP, MITRE, PortSwigger) are fine. Every projector-critical screenshot must also be
inlined in-page per `attention-design` so the back row and absent students aren't blocked.

---

## Self-study track (for the TA, to stay a level above the room)
1. TCM Security "Practical Ethical Hacking" (Heath Adams) — matches our syllabus ~1:1.
2. PortSwigger Web Security Academy (free) — do every lab before teaching it; target BSCP.
3. TryHackMe "Jr Penetration Tester" path.
4. Books: *The Web Application Hacker's Handbook*, Georgia Weidman's *Penetration Testing*.
5. OWASP WSTG — the free methodology reference.

---

## Decision log
- **2026-09-29** — Approved **Approach A**: pilot v2 on Lab 03 (SQLi) rather than redesigning
  the whole semester up front. If Lab 03 lands well in the room, roll v2 across W03–W14 and
  consider backporting the tier bands to Labs 01–02. Capture the reusable v2 template while
  building Lab 03 so the rest of the semester is faster.
- **2026-09-29** — Lab 03 scope locked: **one lab**, not a two-week split. Hands-on core is
  in-band SQLi (auth bypass → error-based → UNION) then `sqlmap` as the finale, all on Juice
  Shop (offline-reliable primary). **Blind SQLi** (boolean + time-based) is taught as a concept
  card in-lab and pushed to the 🔴 Going Pro / take-home tier via PortSwigger's SQLi ladder
  (the most advanced free SQLi labs there are). Juice Shop stays the in-class primary target;
  PortSwigger is the depth ladder. DVWA mentioned once as optional home practice, not required.
  The 14-week map is a one-hour-per-domain sampler with no buffer week; a two-week SQLi flagship
  remains available later by merging W08 (sniffing/ARP) + W09 (VA/CVSS), if depth is preferred.
- **2026-10-03** — **Dropped curl from Lab 03.** Spine is now two tools: **DevTools → Burp**. curl's shell-quoting (the `' OR 1=1--` payload must sit in double quotes) was friction for no teaching gain and slowed the terminal-shy students. The login bypass (§2) now happens in the browser login form with a DevTools Network peek; the error probe (§4) stays in DevTools; UNION/column-count (§5) stays in Burp Repeater. Removed the harvested curl auth-bypass row and the Copy-as-cURL row from `cheatsheets.html` (replaced with a DevTools "read request + response" row), and updated the `site.js` tool-agnostic entry to "DevTools & Burp". Same session also: moved the UNION refresher **below** the SELECT basics in §1 and rebuilt it roomy (two query cards + combined-result table + two rule cards) after Salah found the SVG version too cramped; removed the §1 "one idea behind every payload" callout, the §2 Baseline intro card, and the §4 STRETCH intro card.
- **2026-10-02** — Lab 03 exploit sections restructured to a **tool-agnostic spine: curl → DevTools → Burp**, one job each (curl = login bypass one-shot via `POST /rest/user/login`; DevTools Network tab = error probe `q=')` with Copy-as-cURL bridge; Burp Repeater = `ORDER BY` column count + UNION, where iteration earns the tool). Goal per Salah: students understand the *attack*, not Burp's buttons. Added the "ONE ATTACK, THREE TOOLS" card in §0. Content-audit caught + fixed two stale claims in the process: sqlmap callout said "8 columns" (→9) and the finding's repro said `q='` errors (it returns 200 empty on Juice Shop; real probe is `q=')`) — same `q='` defect fixed in the cheatsheet error-probe row too. Harvested the curl bypass command + DevTools Copy-as-cURL into `cheatsheets.html` and a tool-agnostic entry into `site.js`. This is a candidate pattern to roll across W04+ labs.
- **2026-09-29** — Lab 03 built to v2 and registered (tri-point + cheatsheets/tools harvest).
  Exploit behavior verified against a live `bkimminich/juice-shop`: login bypass `' OR 1=1--`
  works (admin), the real error probe is `q=')` (a lone `q='` returns 200 empty), breakout is
  `'))`, the search table has **9 columns** (the out-of-range `ORDER BY` error states it), and
  the 9-column UNION returns emails in the `id` field and MD5 hashes in `name`. Full verified
  table + pacing + answer key in `teaching-notes/lab03.md`. Not yet committed/pushed (waiting on
  Salah's review). Live browser screenshot still pending: the Chrome extension wasn't connected.
