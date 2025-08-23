1) Sandbox usage (local safety)

Only edit in sandbox: C:\Users\dimam\OneDrive\Desktop\Jewelry.Website\sandbox-20250820-183517.
Baseline (main) is read-only unless you promote.

Ports are fixed: baseline :3000, sandbox :3001. No other ports.

<<<<<<< HEAD
**CRITICAL: Always free ports first with `npm run kill-ports`. Never start on other ports.**

=======
>>>>>>> 5fc3b20079238d8670d61bf90a7940c7b1f46d8f
Start modes

Dev (baseline prod + sandbox hot reload): npm run dev:safe

Prod both (parity/perf): npm run run:both

Stop first, always: npm run stop (frees 3000/3001).

<<<<<<< HEAD
**Manifest Configuration:**
- Use static `public/manifest.webmanifest` + `/public/icons/*.png` only
- Do NOT create `app/manifest.*` files
- Keep manifest configuration in public directory only

**React Stability:**
- Avoid unstable React keys (no `key={index}`)
- Use stable, unique identifiers for keys
- Prevent unnecessary re-renders and layout shifts

=======
>>>>>>> 5fc3b20079238d8670d61bf90a7940c7b1f46d8f
Promote flow (no manual copy):

sandbox → npm run sandbox:patch

<<<<<<< HEAD
main → npm run sandbox:apply → commit

**Error Handling:**
- If sandbox install fails, sync package.json/lockfile from main
- Retry once, then report with exact error details
- Never disable tests to pass CI
=======
main → npm run sandbox:apply → commitality and type safety.
>>>>>>> 5fc3b20079238d8670d61bf90a7940c7b1f46d8f
