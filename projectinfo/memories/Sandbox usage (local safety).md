1) Sandbox usage (local safety)

Only edit in sandbox: C:\Users\dimam\OneDrive\Desktop\Jewelry.Website\sandbox-20250820-183517.
Baseline (main) is read-only unless you promote.

Ports are fixed: baseline :3000, sandbox :3001. No other ports.

Start modes

Dev (baseline prod + sandbox hot reload): npm run dev:safe

Prod both (parity/perf): npm run run:both

Stop first, always: npm run stop (frees 3000/3001).

Promote flow (no manual copy):

sandbox → npm run sandbox:patch

main → npm run sandbox:apply → commitality and type safety.
