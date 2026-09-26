# Course Context Directory — Read First

**LLM-agnostic, plain-markdown context** for the CCY4202 Ethical Hacking & Penetration Testing course. Any AI assistant (Claude Code, ChatGPT, Gemini, Cursor, Aider, GitHub Copilot Chat, etc.) should load these files before authoring lab content or changing course infrastructure.

## Files in this directory

| File | Read when |
|---|---|
| [`master-context.md`](master-context.md) | Always — pedagogical philosophy, professor's directive, 14-week syllabus, TA teaching persona |
| [`classroom-context.md`](classroom-context.md) | Anytime designing UX, navigation, or lab pacing — physical classroom constraints (Saturday × 2 sections, 50-60 students, far projector) |
| [`student-profile.md`](student-profile.md) | Anytime writing content or designing interactions — learner backgrounds, attention profile, engagement triggers, anti-patterns |

## Purpose

Salah maintains this course single-handed as a TA. To avoid re-pasting the same context every AI session, and to keep the project usable across different LLMs and tools, all **cross-session persistent context** lives here as plain markdown with no proprietary syntax.

## What belongs here

- Teaching philosophy that persists across sessions
- Student profile / classroom constraints
- Semester-level plans and priorities
- Anything a new agent would otherwise need re-explained from scratch

## What does NOT belong here

- **Ephemeral session state** (use conversation or task-tracking tools)
- **Lab-specific content** (lives in `/labs/*.html`)
- **Design system documentation** (lives in `.agents/skills/lab-authoring/`)
- **LLM-specific syntax** — no `<function_calls>`, no MCP tags, no tool-specific directives

## For non-Claude LLMs

This repo also uses the `AGENTS.md` convention at the repo root — the emerging universal AI agent entry point (adopted by Claude Code, Cursor, Aider, and OpenAI's Codex tooling). If you're a different LLM entering this repo, start at `../../AGENTS.md`; it links back here.

## Extending this directory

New context files should be added when:
- The information will be needed across multiple sessions
- It is stable (won't be invalidated by a single week of iteration)
- It is not derivable from reading the codebase

Register new files in the table above and in the "Multi-LLM Entry Point" section of `AGENTS.md`.
