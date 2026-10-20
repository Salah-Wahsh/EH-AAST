# Curriculum Plan v2 — Making CCY4202 Career-Useful

> **Status:** ADOPTED 2026-10-19. The new map is now authoritative in
> [`master-context.md`](master-context.md) §5; this file holds the rationale, benchmark, and sources.
> **Purpose:** Rethink the 14-week map so the course trains skills a junior security
> professional actually uses, instead of sampling many topics an hour at a time.
> Read alongside [`lab-design-standard.md`](lab-design-standard.md).
>
> **Decisions locked (Salah, 2026-10-19):** (1) Full four-phase rewrite, cut the low-ROI topics.
> (2) Back half runs on TryHackMe, browser-based, no heavy local VM lab. (3) Target bar is
> eJPT / CPTS entry-level practical skill (not CEH trivia). (4) Fully free to rewrite weeks and
> titles, staying at 14 weeks.

---

## 1. The problem we're fixing

The current map (master-context §5) does two things well: it front-loads web attacks for
engagement (professor-approved), and it names real tools. Where it falls down is the back half.
From Week 6 on it becomes a sampler: one week on ARP poisoning, one on Nessus, one on
Metasploit, one on social engineering, one on pivoting. An hour each. Nobody leaves able to do
any of them to a standard an employer would pay for.

That's the "basic uni stuff" complaint. The fix isn't more topics, it's fewer topics taught
deep enough to transfer to a job.

---

## 2. What every serious program actually teaches (benchmark)

Pulled from the OSCP/PEN-200 syllabus, Hack The Box's CPTS path, TCM Security's Practical
Ethical Hacking, representative university pentest syllabi, and live junior-pentester job
postings. Sources at the bottom.

| Core skill | OSCP (PEN-200) | HTB CPTS | TCM PEH | Uni pentest | In job posts |
|---|:---:|:---:|:---:|:---:|:---:|
| Methodology + note-keeping | ✅ | ✅ | ✅ | ✅ | ✅ |
| Recon + scanning + enumeration | ✅ | ✅ | ✅ | ✅ | ✅ (Nmap) |
| Web app exploitation | ✅ | ✅ | ✅ | ✅ | ✅ (Burp) |
| Service exploitation / initial access | ✅ | ✅ | ✅ | ✅ | ✅ (Metasploit) |
| **Privilege escalation (Linux + Windows)** | ✅ | ✅ | ✅ | ✅ | implied |
| **Active Directory attacks** | ✅ (×3 modules) | ✅ (core) | ✅ | partial | growing |
| Post-exploitation / pivoting | ✅ | ✅ | ✅ | ✅ | implied |
| **Reporting woven throughout** | ✅ | ✅ | ✅ | ✅ (capstone) | ✅ (communication) |
| Wireless | ❌ | ❌ | ✅ | some | rare |
| Social engineering lab | ❌ | ❌ | brief | some | rare |
| ARP poisoning / SSL strip | ❌ | ❌ | ❌ | legacy | ❌ |

**The two things in every program that our map underweights or skips: privilege escalation and
Active Directory.** Those are the spine of a real internal penetration test, and AD is where
most paid engagements and most entry-level work actually live. Our current map only touches AD
once, in Week 13, as "basics," and never teaches privilege escalation as its own skill at all.

**The three things every program drops that our map still carries:** ARP poisoning / SSL
stripping (largely dead thanks to HTTPS and HSTS), a full week of Nessus-driven vulnerability
assessment (button-clicking, not skill), and a social-engineering toolkit lab (high classroom
setup, low hands-on payoff). Metasploit survives everywhere, but as one tool inside
exploitation, not its own week with an ancient exploit like MS08-067.

---

## 3. Anchoring the web block to what's current

Web is still the right opening, and it should map to the current OWASP priorities so students
learn the vocabulary interviewers use.

**OWASP Top 10 2025** (release candidate) reordered things in a way that matters for us:

1. A01 Broken Access Control (still #1, now also absorbs SSRF)
2. A02 Security Misconfiguration (jumped from #5 to #2)
3. A03 Software Supply Chain Failures (new)
4. A04 Cryptographic Failures
5. A05 Injection (SQLi, command injection, still where our Lab 03 sits)
6. A06 Insecure Design
7. A07 Authentication Failures
8. A08 Software or Data Integrity Failures
9. A09 Logging and Alerting Failures
10. A10 Mishandling of Exceptional Conditions (new)

**OWASP API Security Top 10 2023** puts Broken Object Level Authorization (BOLA, basically IDOR
for APIs) at #1, and most of its list is access-control failures. Modern apps are APIs behind a
single-page front end, which is exactly what Juice Shop is.

Takeaway: **Broken Access Control (IDOR / BOLA / forced browsing / auth bypass) deserves its own
week.** It's #1 on both OWASP lists, it's the most common real finding, and right now we barely
touch it. XSS stays (client-side is still core and it's the next lab anyway). Injection stays
(Lab 03). We don't need a week each on A08/A09/A10 in an intro.

---

## 4. Design principles for the rewrite

1. **Depth over breadth.** Four phases taught properly beats eleven topics sampled.
2. **Keep the web-first hook,** then loop back to recon and go down the stack into systems and AD,
   exactly as the current "Skip & Navigate" strategy promises.
3. **The methodology spine (Recon → Map → Identify → Exploit → Document) runs through every lab,**
   so the process becomes muscle memory (already in lab-design-standard v2).
4. **Reporting is a thread, not a finale.** One written finding per lab all semester, one full
   report at the capstone. Reporting is the single biggest thing juniors can't do.
5. **Map every week to the professional world:** OWASP item, MITRE ATT&CK ID, and the cert it
   builds toward (eJPT / CPTS entry level, not CEH trivia).
6. **Tiers carry the mixed room** (🟢/🟡/🔴). 🔴 is the career-grade depth, per the section-authoring skill.

---

## 5. Proposed revised 14-week map

Web-first (6 weeks, deep, OWASP-anchored), then the career spine the old map was missing.

| Wk | Phase | Topic | Hands-on target |
|---|---|---|---|
| **01** | Foundations | How the web really works, HTTP, DevTools, the pentest methodology, legal basics. | Browser DevTools (current Lab 01) |
| **02** | Web | Burp Suite + app mapping / recon. | Juice Shop + PortSwigger (current Lab 02) |
| **03** | Web | Injection: SQL injection + a look at command injection. (OWASP A05) | Juice Shop + PortSwigger (current Lab 03) |
| **04** | Web | XSS + session/cookie theft, HttpOnly. (client-side) | Juice Shop + PortSwigger (Lab 04, next) |
| **05** | Web | **Broken Access Control: IDOR / BOLA / forced browsing / auth bypass.** (OWASP A01 + API #1) | Juice Shop + PortSwigger |
| **06** | Web→System | Security misconfig + file upload to a working web shell + OS command injection. The bridge from web into the OS. (A02) | PortSwigger File Upload (real Apache/PHP) is the spine; Juice Shop upload bugs (XXE/Zip Slip/API) are a TA demo only |
| **07** | Network | Recon + scanning + enumeration, for real. Nmap, service identification. (the promised loop-back) | TryHackMe / Kali |
| **08** | System | Service exploitation + initial access. Finding and running an exploit, Metasploit as a tool. | TryHackMe |
| **09** | System | **Privilege escalation.** Linux is the hands-on core (SUID, sudo, cron, PATH, LinPEAS); Windows is the 🔴 + take-home track, revisited on domain hosts in the AD block. (the missing core) | TryHackMe |
| **10** | Active Directory | AD foundations + enumeration (BloodHound, the lay of a domain). | TryHackMe AD rooms |
| **11** | Active Directory | AD attacks: Kerberoasting, AS-REP roasting, pass-the-hash, relay. | TryHackMe AD rooms |
| **12** | Active Directory | Lateral movement + post-exploitation: pivoting, credential dumping. | TryHackMe AD rooms |
| **13** | Deliver | Reporting + the engagement lifecycle. Turn the semester's findings into one real report. CVSS, exec vs technical. | The semester's own Findings Log |
| **14** | Capstone | Full CTF: compromise a target end to end, write it up properly. | VulnHub / TryHackMe / HTB box |

What changed from the old map: Broken Access Control gets a dedicated week (05); file upload
becomes the deliberate bridge into systems (06); privilege escalation becomes its own week (09);
Active Directory grows from one "basics" week to a three-week flagship (10-12); reporting moves
from a single capstone mention to a dedicated week plus the all-semester findings thread.

What got cut: ARP poisoning / SSL stripping, the standalone Nessus vulnerability-assessment week
(CVSS folds into Week 13 reporting), the social-engineering toolkit lab, and chasing MS08-067 as
a Metasploit set-piece. Wireless is parked as optional (needs hardware, rarely in junior job
specs).

---

## 6. Infrastructure reality check (the make-or-break)

Weeks 1-6 are browser-only and already proven: Juice Shop (offline Docker) and PortSwigger (free,
hosted). No change.

Weeks 7-12 (network, privesc, AD) need target machines. The old map already pointed these at
**TryHackMe**, which is the realistic vehicle: browser-based or lightweight VPN, no 16 GB RAM
lab build on 50-60 student laptops, AD rooms that already exist (Attacktive Directory and
similar). A local Kali + vulnerable-VM build is the "proper" path but almost certainly too heavy
for the room. This is the single biggest open question and it shapes how hands-on the back half
can be. See decisions below.

---

## 7. Decisions (resolved 2026-10-19)

1. **Restructure appetite — Full four-phase rewrite.** Cut ARP/SSL-strip, the standalone Nessus
   VA week, and the social-engineering lab; grow privesc to its own week and AD to a three-week
   flagship; add Broken Access Control (W05) and Reporting (W13).
2. **Infrastructure — TryHackMe, browser-based.** Weeks 7-12 run on TryHackMe rooms (browser or
   light VPN), no heavy local Kali+VM lab on student machines. Weeks 1-6 stay on Juice Shop +
   PortSwigger.
3. **Target bar — eJPT / CPTS entry-level.** Practical junior-pentester skill, OWASP/MITRE
   vocabulary, no CEH memorization track.
4. **Freedom — fully free.** Weeks and titles rewritten as needed, kept to 14 weeks.

### Still to work out as we build each phase
- Exact TryHackMe room picks per week (W07-W12), checked to be free-tier or within whatever THM
  access the students have. Confirm THM access model before building the network/AD labs.
- Whether Labs 01-02 get backported to the section-authoring voice/method (currently forward-only).
- Command injection: placed in W06 alongside the web shell (both are "get code running on the
  server"), with a nod to it in W03 so the injection family stays connected. Revisit if W06 gets heavy.

---

## 8. Sources

- OWASP Top 10 2025 vs 2021: https://codific.com/owasp-top-10-2025-what-it-is-what-changed-and-what-to-do-with-it/ and https://www.fastly.com/blog/new-2025-owasp-top-10-list-what-changed-what-you-need-to-know
- OWASP API Security Top 10 2023: https://indusface.com/learning/owasp-api-top-10/
- OSCP PEN-200 syllabus: https://manage.offsec.com/app/uploads/2026/03/PEN-200_Syllabus.pdf
- HTB CPTS / Penetration Tester path: https://www.hackthebox.com/blog/certified-penetration-testing-specialist-cpts
- TCM Practical Ethical Hacking outline: https://github.com/9QIX/TCMSecurity-PracticalEthicalHacking
- Junior pentester job requirements: https://www.ziprecruiter.com/Jobs/Junior-Penetration-Tester and https://www.indeed.com/q-entry-level-penetration-tester-jobs.html
- University pentest syllabi (George Mason DFOR 767, TAMU-SA CSEC 4324): https://dfor.gmu.edu/wp-content/uploads/2025/08/DFOR-767-2024-Penetration-Testing-Forensics-Syllabus.pdf
