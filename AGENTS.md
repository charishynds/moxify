# Agent Instructions

Before making workflow, Git, deployment, or release decisions in this repo, read the global SOP first:

- `C:\Development\_shared\website-operating-procedure.md`

If that path is unavailable, use the repo-local copy:

- `docs/operating-procedure.md`
- `README.md`
- `docs/codebase-review-plan.md` when continuing the current prelaunch review work

Use `main` as the production branch once GitHub has been updated. Create a feature/fix/content/chore branch for meaningful changes, run checks, push the branch, and use the Vercel Preview Deployment for review.

Do not commit local `.env.local`, `.codex-*` artifacts, `dist`, or `node_modules`.
