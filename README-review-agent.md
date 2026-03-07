# Site Editorial Review Agent

A Claude Code slash command that acts as an editorial reviewer and fact-checker for the NACSI/NAHCI/NACS website. Drop this into your site repo and run `/review-site` whenever you want a fresh audit.

---

## What It Does

When you run `/review-site` in Claude Code inside your site repo, the agent will:

1. Load the source-of-truth fact baseline and editorial guidelines
2. Crawl all your HTML/JSX/TSX content files
3. Check every piece of copy against 7 categories of issues:
   - Factual errors (wrong numbers, names, claims)
   - Incredulous or unverifiable claims
   - Heavy marketing / corporate fluff language
   - Pushy or pressure-driven copy
   - Redundant or extraneous messaging
   - Voice and tone inconsistencies
   - Structural copy problems (missing alt text, generic headlines, etc.)
4. Write a dated markdown report to `reviews/review-YYYY-MM-DD.md`
5. Print a terminal summary of the top issues

---

## Setup

### Step 1 — Copy this folder into your site repo

Your site repo structure should look like this after copying:

```
your-site-repo/
├── .claude/
│   └── commands/
│       └── review-site.md      ← the slash command
├── review-config/
│   ├── source-of-truth.md      ← FILL THIS IN (see below)
│   └── editorial-guidelines.md ← tone and copy standards
├── reviews/                    ← generated reports go here
│   └── (empty to start)
└── ... (rest of your site files)
```

If `.claude/` already exists in your repo (it should if you've used Claude Code), just copy the `commands/` folder into it.

### Step 2 — Fill in source-of-truth.md

Open `review-config/source-of-truth.md` and fill in all the `[FILL IN]` sections. This is the most important step — the agent's fact-checking is only as good as what's in this file.

At minimum, fill in:
- Organization names and relationships (NACSI / NAHCI / NACS)
- Mission statement (exact text from official docs)
- Facility list with correct names and cities
- Services/programs with availability per location
- Any statistics or claims that appear on the site
- Any awards or certifications mentioned

### Step 3 — Run it

In Claude Code, from inside your site repo:

```
/review-site
```

That's it. The agent will run and write the report to `reviews/`.

---

## Workflow Tips

**Before a content review meeting:** Run `/review-site` the day before. Share the markdown report with stakeholders as a pre-read.

**After making copy changes:** Run it again to confirm the issues were resolved and no new ones were introduced.

**When onboarding a new copywriter:** Point them to `review-config/editorial-guidelines.md` as the style guide.

**Keeping source-of-truth current:** Whenever something about the org changes — new facility, updated statistic, new program — update `source-of-truth.md` immediately. Stale facts produce false-positives and missed errors.

---

## Report Severity Levels

| Icon | Level | Meaning |
|---|---|---|
| 🔴 | ERROR | Factually wrong or potentially damaging. Fix before launch. |
| 🟡 | FLAG | Weak, vague, or tone-problematic copy. Should be addressed. |
| 🔵 | SUGGESTION | Improvement opportunity. Lower priority but worth doing. |

---

## Files in This Package

| File | Purpose |
|---|---|
| `.claude/commands/review-site.md` | The Claude Code slash command prompt |
| `review-config/source-of-truth.md` | NACSI/NAHCI/NACS fact baseline — **keep this updated** |
| `review-config/editorial-guidelines.md` | Voice, tone, and red-flag copy patterns |
| `reviews/` | Output folder — all generated reports land here |
| `README-review-agent.md` | This file |

---

## Scheduling Automatic Reviews

If you want this to run on a schedule (e.g., every Monday before standup), you can set that up in Cowork on the personal Mac using the Schedule skill — it can trigger a Claude Code run on a cron schedule.

---

*Built with Claude Code + Cowork. Source of truth seeded from The Greenwoods vault, 2026-03-06.*
