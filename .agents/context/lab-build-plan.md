# Lab Build Plan — Finishing the Semester's Content (Labs 05–14)

> **Status:** IN PROGRESS, started 2026-10-20. Goal: author all remaining labs now, offline,
> each ready to push the week it's taught, so the TA can focus on studying the material.
> Built on [`curriculum-plan-v2.md`](curriculum-plan-v2.md) (the adopted 14-week map) using the
> [`section-authoring`](../skills/section-authoring/SKILL.md), [`human-voice`](../skills/human-voice/SKILL.md),
> [`anti-cognitive-overload`](../skills/anti-cognitive-overload/SKILL.md), and
> [`content-audit`](../skills/content-audit/SKILL.md) skills, plus a per-lab
> [`instructor-briefing`](../skills/instructor-briefing/SKILL.md).

## Decisions (Salah, 2026-10-20)
1. **THM labs (07–12, 14) accuracy:** build now against named **free-tier** TryHackMe rooms using
   their documented behavior + standard tool output. Each teaching note lists exactly what to
   re-check live before class. Labs 05–06 are live-verified by the agent on Juice Shop + PortSwigger.
2. **THM access:** free tier only. Pick only free rooms; flag where a premium room would be stronger.
3. **Review cadence (Autonomous Peer-Audit Mode):** Read [`peer-auditor.md`](peer-auditor.md) before starting each lab for verified THM room data, hashes, and pedagogical tips. Finish each lab, run all three audits (voice, cognitive-load, content-audit), commit locally, and proceed directly to the next lab through Lab 14 without blocking on manual sign-off—the Peer Auditor agent is watching the repo and auditing behind you in [`peer-auditor.md`](peer-auditor.md).
4. **Deliverable per lab:** `labs/labXX.html` + tri-point registration + cheatsheets/tools harvest +
   `teaching-notes/labXX.md`. Commit per lab (hold `git push` until all labs are done and audited).

## Progress
- [x] Lab 04 — XSS (done, pushed)
- [ ] Lab 05 — Broken Access Control  ← building now (live-verify on Juice Shop)
- [ ] Lab 06 — Misconfig → File Upload → Web Shell + OS command injection
- [ ] Lab 07 — Recon, Scanning & Enumeration
- [ ] Lab 08 — Service Exploitation & Initial Access
- [ ] Lab 09 — Privilege Escalation
- [ ] Lab 10 — AD Foundations & Enumeration
- [ ] Lab 11 — AD Attacks
- [ ] Lab 12 — Lateral Movement & Post-Exploitation
- [ ] Lab 13 — Reporting & the Engagement Lifecycle
- [ ] Lab 14 — Capstone CTF

---

## Per-lab spec

Each lab follows the v2 shape: real-world breach anchor → methodology spine (Recon→Map→Identify→Exploit→Document)
→ 🟢 Baseline / 🟡 Stretch / 🔴 Going Pro tiers → prediction prompts every 5–7 min → one written finding →
the fix side by side → cert band (OWASP + MITRE + cert) → quiz with ≥1 payload/command challenge.

### Lab 05 — Broken Access Control (Week 5) · A01 + API #1 BOLA
- **Anchor:** a real IDOR/BOLA breach where sequential IDs or an unprotected endpoint leaked records
  (candidates to verify: First American Financial 885M docs via sequential URL; USPS Informed Visibility
  API; Parler sequential-ID scrape). Pick one, state it plainly.
- **Concepts:** authentication vs authorization; horizontal vs vertical escalation; IDOR / BOLA;
  forced browsing; mass assignment; "never trust a client-supplied ID."
- **Targets (live-verify):** Juice Shop — view another user's basket (IDOR on basket id), reach
  `/#/administration` by forced browsing, see other users' data; PortSwigger access-control labs
  (user-ID-in-URL IDOR, unprotected admin, URL-based bypass).
- **Tiers:** 🟢 change a basket/order id to read someone else's. 🟡 forced-browse the admin panel /
  escalate role. 🔴 BOLA on the REST API: tamper the JWT user id / mass-assign `isAdmin`.
- **Fix:** server-side authorization checks on every request, deny-by-default, don't expose or trust
  object IDs, scope every query to the session user.
- **New to harvest:** any forced-browsing / IDOR tooling (Burp Repeater id-tamper workflow; Autorize
  concept as a mention, not required). Likely no new installable tool.
- **Cert band:** OWASP A01 + API Top 10 #1 (BOLA) · MITRE T1548 · eJPT / BSCP.

### Lab 06 — Security Misconfig → File Upload → Web Shell + OS Command Injection (Week 6) · A02 — the bridge to the OS
- **Anchor:** a real upload-to-RCE or misconfig breach (candidate: web-shell-via-upload incident, or
  Equifax Struts RCE framed as "server ran attacker input").
- **Concepts:** security misconfiguration (default creds, directory listing, verbose errors, exposed
  admin/config); file-upload validation bypass (content-type, extension, magic bytes); web shell;
  OS command injection. This lab is the deliberate bridge: web bug → shell on the OS → the next weeks
  are what you do with that shell.
- **Targets (live-verify):** PortSwigger File Upload labs (real Apache/PHP — upload a PHP web shell,
  get RCE) = the spine; PortSwigger OS command injection labs. Juice Shop upload bugs (XXE / Zip Slip)
  = TA demo only (Node app, can't run a PHP shell — same honesty call as Lab 04's reflected/stored).
- **Tiers:** 🟢 upload a PHP shell where there's no check, run `id`. 🟡 bypass a content-type/extension
  filter. 🔴 OS command injection → reverse shell; chain exposed config → RCE.
- **Fix:** validate upload type by content not extension, store outside webroot, no execute perms;
  never pass user input to a shell, use allow-lists / parameterized APIs.
- **New to harvest:** PHP web-shell one-liner, `nc`/reverse-shell basics, OS command-injection payloads
  (`; id`, `| whoami`, `$(...)`), content-type/extension bypass notes.
- **Cert band:** OWASP A02 · MITRE T1505.003 (web shell) / T1059 (command exec) · eJPT / BSCP.

### Lab 07 — Recon, Scanning & Enumeration (Week 7) · the loop-back to the network
- **Anchor:** a breach that started from an exposed service found by scanning (Shodan-style exposure).
- **THM (free):** Nmap room, Network Services / Enumeration rooms. *Verify live before class.*
- **Concepts:** host discovery; TCP connect vs SYN scan; service/version + OS detection; NSE; service
  enumeration (SMB enum4linux, HTTP gobuster, FTP/SSH banners). Ties back to Lab 01's TCP/port theory.
- **Tiers:** 🟢 full nmap scan + read the output. 🟡 NSE scripts, SMB share enum. 🔴 full enumeration
  methodology on a THM box, build a target map.
- **New to harvest:** `nmap` (and flags), `gobuster`/`ffuf`, `enum4linux`, `smbclient`.
- **Cert band:** MITRE T1595 / T1046 · eJPT core.

### Lab 08 — Service Exploitation & Initial Access (Week 8)
- **Anchor:** a known-CVE service exploited for a foothold.
- **THM (free):** a Metasploit room + a beginner initial-access room. *Verify live.*
- **Concepts:** enumeration → exploit; finding exploits (searchsploit, exploit-db); Metasploit as one
  tool not the whole job; manual vs automated; reverse shells; payloads.
- **Tiers:** 🟢 run a Metasploit module to a shell. 🟡 find + adapt a public exploit manually. 🔴 exploit
  without Metasploit, understand the payload.
- **New to harvest:** `msfconsole` basics, `searchsploit`, `nc` listener, payload concepts.
- **Cert band:** MITRE T1190 / T1203 · eJPT.

### Lab 09 — Privilege Escalation (Week 9) · the missing core
- **Anchor:** "low shell → root/SYSTEM," the everyday pentest move.
- **THM (free):** Linux privesc room (Linux core); Windows privesc as 🔴 + take-home. *Verify live.*
- **Concepts:** post-foothold enumeration; LinPEAS; SUID (GTFOBins), `sudo -l` misconfig, writable cron,
  PATH hijack, kernel exploit as last resort. Windows: WinPEAS, unquoted service paths, token privileges (brief).
- **Tiers:** 🟢 SUID/sudo misconfig → root with LinPEAS. 🟡 cron / PATH. 🔴 Windows privesc path + manual enum.
- **New to harvest:** `linpeas.sh`, GTFOBins workflow, `sudo -l`, `find / -perm -4000`.
- **Cert band:** MITRE T1548 / T1068 · eJPT / CPTS core.

### Lab 10 — AD Foundations & Enumeration (Week 10)
- **Anchor:** AD as where real engagements live (ransomware-via-AD).
- **THM (free):** Attacktive Directory + an AD-basics/enumeration room. *Verify live.*
- **Concepts:** what AD is (domain, DC, OU, users, groups, GPO, Kerberos/NTLM basics); why it's a flat
  attack surface; enumeration with BloodHound/SharpHound, ldapsearch, enum4linux, rpcclient.
- **Tiers:** 🟢 enumerate users/shares on a domain. 🟡 BloodHound ingest + find a path. 🔴 read attack paths, map the domain.
- **New to harvest:** `bloodhound` / `SharpHound`, `ldapsearch`, `rpcclient`, `kerbrute`.
- **Cert band:** MITRE T1087 / T1069 · CPTS AD core.

### Lab 11 — AD Attacks (Week 11)
- **Anchor:** a Kerberoasting / AS-REP step in a real intrusion.
- **THM (free):** AD attack rooms. *Verify live.*
- **Concepts:** Kerberoasting, AS-REP roasting, password spraying, pass-the-hash, NTLM relay (concept/demo).
- **Tiers:** 🟢 Kerberoast a service account + crack offline. 🟡 AS-REP roast, spray. 🔴 pass-the-hash / relay.
- **New to harvest:** `GetUserSPNs` / impacket, `hashcat`, `crackmapexec`, `Rubeus` (concept).
- **Cert band:** MITRE T1558 (Kerberoasting) / T1550 (PtH) · CPTS.

### Lab 12 — Lateral Movement & Post-Exploitation (Week 12)
- **Anchor:** lateral movement + dwell time in a real breach.
- **THM (free):** AD rooms continuing from 10–11. *Verify live.*
- **Concepts:** credential dumping (Mimikatz, LSASS, SAM); pivoting (proxychains, chisel); host-to-host
  (PsExec / WMI / WinRM); reaching Domain Admin; cleanup / OPSEC awareness.
- **Tiers:** 🟢 dump creds + reuse on another host. 🟡 pivot through a host. 🔴 full chain to DA.
- **New to harvest:** `mimikatz`, `psexec.py`, `evil-winrm`, `proxychains`, `chisel`.
- **Cert band:** MITRE T1003 / T1021 / T1570 · CPTS.

### Lab 13 — Reporting & the Engagement Lifecycle (Week 13) · the deliverable
- **Anchor:** the report is the product the client pays for; a weak report sinks a good test.
- **Target:** the semester's own Findings Log (one finding produced per lab all term).
- **Concepts:** engagement lifecycle (pre-engagement → recon → exploit → post-ex → reporting → retest);
  anatomy of a finding (title, severity, CVSS v3.1, asset, steps to reproduce, impact, remediation,
  references); CVSS scoring (the cut Nessus/VA week's CVSS folds in here); exec summary vs technical
  detail; writing for the audience. More workshop than exploit lab.
- **Tiers:** 🟢 CVSS-score 2–3 of your own findings, write to template. 🟡 write an exec summary.
  🔴 assemble a full mini-report from the semester's findings.
- **Build:** a report template, a CVSS walkthrough, worked examples pulled from Labs 03/04/05.
- **Cert band:** every cert's report requirement (OSCP exam report) · communication skill.

### Lab 14 — Capstone CTF (Week 14)
- **Anchor:** put it all together on one box, end to end, then report it.
- **THM/box (free):** a box that chains web → foothold → privesc. *Verify live / pick carefully.*
- **Structure:** less teaching, more guided challenge — methodology checklist, hint accordions (full
  solutions live only in the teaching note, never deployed), required report deliverable.
- **Tiers:** graded by how little hint you take; 🔴 = no hints.
- **Cert band:** the full methodology · OSCP-style.

---

## Open items carried from curriculum-plan-v2 §7
- Confirm exact free THM rooms per week as each back-half lab is built (room names above are the plan,
  pinned at build time).
- Labs 01–02 backport to the section-authoring voice stays **out of scope** for this push (forward-only).
