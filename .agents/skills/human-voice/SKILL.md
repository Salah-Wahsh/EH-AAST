---
name: human-voice
description: >-
  Writing voice for all student-facing CCY4202 content (labs, callouts, quiz feedback,
  cheat sheets). Makes copy sound like a sharp TA talking to the room, not an AI
  generating a document. Bans the telltale AI tics (em dashes, "It's not X, it's Y",
  triplet lists, hype words) and adds a light, dry sense of humor. Apply whenever
  writing or editing any text a student will read.
---

# Human Voice Skill: Sound Like the TA, Not the Model

Students can smell AI-generated text in one sentence. Once they do, they stop reading and start skimming. This skill keeps the copy sounding like one person (Salah, the TA) explaining things to a room of 4th-years on a Saturday morning.

Works alongside [anti-cognitive-overload](../anti-cognitive-overload/SKILL.md) (how *much* to write) and [attention-design](../attention-design/SKILL.md) (when to interrupt). This one covers *how it sounds*.

---

## 🎙️ The Voice in One Line

> A friendly senior who's done this a hundred times, talks plainly, and is slightly amused by how broken the target is.

- Second person, present tense: "you", "your request", "you'll see".
- Contractions always: "don't", "it's", "you'll". Nobody says "do not" out loud.
- Short sentences. Then a slightly longer one when it earns it.
- Confident, not hyped. Say what happens. Skip the adjectives.

---

## 🚫 Hard Bans (AI Tells)

Run the lint at the bottom before committing. These are non-negotiable.

| Tell | Why it's banned | Do this instead |
|---|---|---|
| **Em dash `—`** in prose | The #1 AI fingerprint | Period, comma, colon, or parentheses. Two sentences are fine. |
| **"It's not X, it's Y"** / "X isn't just A, it's B" | Pseudo-profound reframe | State Y directly. |
| **Forced triplets** ("fast, simple, and powerful") | Rhythm filler | Keep the one item that matters. |
| **Hype words**: *superpower, seamless, robust, powerful, leverage, unlock, elevate, crucial, delve, dive into, game-changer, journey, empower* | Marketing voice | Say what it actually does. |
| **Throat-clearing**: "Let's", "In this section we will", "It's worth noting", "Simply", "Just" (as filler) | Padding | Start with the verb or the fact. |
| **Fake-deep closers**: "That's it.", "That's the whole game.", "Muscle memory beats muscle recall." | Slogan-y, reads generated | End on the useful fact, or on a joke that's actually funny. |
| **Summary echo** at the end of a paragraph repeating the first line | Filler | Delete it. |
| **Emoji on every line** | Visual noise | One per heading or card, max. Emoji in SVGs/labels are fine. |

**Allowed exceptions**: em dashes inside `<title>` tags site-wide (`Lab 02: … — CCY4202`, matches every page), inside code/terminal output, and inside SVG labels where space is tight. Use the en dash `–` only for numeric ranges (`20–40 rows`, `Weeks 6–7`).

---

## 😏 Humor: A Pinch, Not a Bit

The goal is a small smile every few sections. It keeps people reading. It shouldn't turn into a stand-up set.

**Rules**
1. **Max one joke per section.** Most sections get zero. Aim for ~4–6 across a whole lab.
2. **Jokes live in low-stakes spots**: callouts, accordion bodies, prediction-prompt reveals, quiz *wrong-answer* feedback, "nothing captured?" troubleshooting. **Never** inside a numbered step or a command someone has to type correctly.
3. **Punch at the target, the tools, or the shared pain**, never at the student. Juice Shop being badly written, Burp's UI renaming menus every release, Docker eating disk space, uni wifi, the 8:30 AM Saturday slot. That's fair game.
4. **Dry > zany.** Understatement beats exclamation marks. No "LOL", no memes in text, no pop-culture references that'll age in a semester.
5. **The joke must still teach or be skippable.** If you delete it, the instruction must still be complete.
6. **Wrong-answer feedback** is the best place for a gentle joke. It takes the sting out of being wrong. Keep the correction in the same line.

**Calibration examples**

| ❌ Too much / wrong kind | ✅ Right amount |
|---|---|
| "🚀 Burp is your SUPERPOWER! Let's hack the planet! 🔥" | "Burp holds the request and waits for you, like a very patient bouncer." |
| "Wrong! Did you even read the section? 😂" | "Close, but DevTools only sees its own tab. It has no idea your phone exists." |
| "Juice Shop is so insecure lmao" | "Juice Shop answers with the full SQL query. Very helpful of it. Real apps are usually less generous." |
| "It's not just a proxy — it's a mindset." | (delete) |

---

## ✍️ Rewrite Patterns

| Generated-sounding | Human |
|---|---|
| "Scoping isn't a UI convenience — it's a boundary-of-authorization control." | "Scope isn't there to make the UI tidy. It's the line your contract draws, and Burp helps you stay behind it." |
| "Three tools, one wire result." | "Three tools, same request on the wire." (or just drop it) |
| "This is Burp's superpower." | "Nothing else on this list can do that." |
| "Every web attack is just a modified HTTP request… That's it." | "Most web attacks come down to sending a request the developer didn't expect." |
| "You'll loop back to recon later — armed with the intuition of…" | "We'll come back to recon later, and it'll make more sense once you've seen a real target up close." |

---

## ✅ Pre-Commit Voice Check

1. **Lint** (must return nothing except `<title>` lines and code):
   ```bash
   grep -n '—' labs/labXX.html | grep -v '<title>'
   grep -n -i -E 'superpower|seamless|robust|leverage|unlock|delve|crucial|game.?changer|that.s it\.' labs/labXX.html
   ```
2. **Read-aloud test**: read three random paragraphs out loud. If you wouldn't say it to the class, rewrite it.
3. **Joke count**: 4–6 per lab, none inside numbered steps or commands.
4. **Contraction check**: search for `do not`, `you will`, `it is`. Contract them unless it's a warning that needs weight ("Do not run this against a real site").
