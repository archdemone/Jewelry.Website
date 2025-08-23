
3) Git workflow (simple & safe)

Branches:

main = stable.

Feature work → sandbox branch (e.g. sandbox/feat-xyz) in the worktree.

Commits:

Commit in sandbox branch as you iterate.

Promote via patch → apply to main → commit → push.

Pull Requests (optional but good):

Push sandbox branch and open a PR into main.

Squash merge to keep history clean.