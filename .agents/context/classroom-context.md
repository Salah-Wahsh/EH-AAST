# Classroom & Schedule Context

**Course**: CCY4202 Ethical Hacking & Penetration Testing (AAST)
**Instructor role**: Teaching Assistant — Salah
**Semester length**: 14 weeks (topic-by-week timeline in [`master-context.md`](master-context.md))

## Session cadence
- **Class day**: Saturday. Every Saturday starts a new week.
- **Sections per week**: 2 — Salah teaches the same weekly lab to two student groups back-to-back on Saturdays.
- **Iteration window**: Any issue found teaching section 1 can be fixed live in the lab file before section 2 (same day).
- **Week 1 status**: complete. **Week 2** (Burp Suite basics — Lab 02) is the next upcoming session.

## Classroom physics
- **Class size**: 50–60 students per section (100–120 across the two sections weekly).
- **Projector**: available but **far from most students**. Cannot be the single source of truth. Salah has tried to make the site visible from distance, but back-row students still struggle to read.
- **Student laptops**: assumed present. Every student is expected to run Docker + Burp locally, and to follow along on the lab page on their own screen.

## Implications for lab UX (enforce across all labs)

1. **The lab page is the second screen** — the projector is supplementary, not primary. Every critical instruction, command, and diagram must be readable on a student laptop.
2. **Fast section navigation** — QR code + short URL at top of each lab so the TA can say *"jump to #tamper-get"* and every student lands there in 2 seconds.
3. **Persistent "you are here" indicator** — bottom-right corner, always visible, showing the current section. Students who lose focus can reorient in one glance.
4. **All section headings must have stable URL fragments** — no auto-generated hashes that change if content is edited.
5. **Nothing critical hides in projector-only demos** — if the TA shows something on-screen, it must also exist as a visible artifact (screenshot, GIF, or `.burp-mock` panel) in the lab page itself.
6. **Print-friendly one-page handout per lab** — students who prefer paper can bring a command/payload cheat-sheet to class.

## Related context
- [`master-context.md`](master-context.md) — pedagogical philosophy + 14-week syllabus
- [`student-profile.md`](student-profile.md) — attention profile + mixed-background learner constraints
