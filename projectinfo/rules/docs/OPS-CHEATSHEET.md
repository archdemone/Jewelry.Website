# Quick Ops Cheat-Sheet (Windows / PowerShell)

## Say this → run this
| What you say | Command | What it does |
|---|---|---|
| **start dev** / **start the server** | `npm run dev:safe` | Baseline **prod** on :3000 + Sandbox **dev** (hot reload) on :3001. Frees ports first. |
| **start prod** / **perf run** | `npm run run:both` | Build then start both in **production** (`next start`) on :3000/:3001. |
| **start sandbox only** | `npm run dev:sandbox` | Sandbox **dev** on :3001 (hot reload). |
| **start baseline only** | `npm run start:baseline` | Baseline **prod** on :3000. |
| **start both (already built)** | `npm run start:both` | Start both in **prod** (skips build). |
| **stop servers** | `npm run stop` | Frees ports **3000/3001**. |
| **status** | `npm run status` | Prints HTTP codes for `/` on :3000 and :3001. |
| **promote/apply to main** | `npm run sandbox:patch` → `npm run sandbox:apply` | Create patch from sandbox → apply to main, then commit. |

**Default if unclear:** agent asks **“dev or prod?”**. If no answer → **`npm run dev:safe`**.

**Golden rules**
- **Edit only in sandbox** (baseline is read-only unless you say “promote”).
- **Ports:** only **3000/3001**; always `npm run stop` first.
- **Dev:** webpack (Turbopack off). **Prod:** `next start`.
- **Report:** show commands + exit codes, `npm run status`, and last 20–50 log lines.
