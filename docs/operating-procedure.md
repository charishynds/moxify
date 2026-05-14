# Website Project Operating Procedure

This procedure is intended for small client websites built by one person, with enough structure that another developer or AI assistant can step in safely.

## Standard Workflow

Use GitHub Flow:

1. Keep `main` as the production branch.
2. Create a branch for every meaningful change.
3. Work locally and preview at `http://localhost:<port>/`.
4. Run checks before pushing.
5. Push the branch to GitHub.
6. Review the Vercel Preview Deployment for that branch or pull request.
7. Merge the pull request into `main` when ready.
8. Let Vercel deploy production from `main`.

Do not use Vercel "Promote to Production" as the normal release path. Use it only for unusual cases where a specific deployment must be promoted outside the Git merge flow.

## Branch Naming

Use short, descriptive branch names:

- `feature/<thing>` for new features
- `fix/<thing>` for bug fixes
- `content/<thing>` for copy or content updates
- `chore/<thing>` for maintenance, config, or docs
- `client/<client-or-site>-<thing>` when the client/site name helps avoid confusion

Examples:

- `feature/contact-form`
- `fix/mobile-hero-heading`
- `content/homepage-refresh`
- `chore/vercel-headers`

## Local Development

Install and run project commands from the repo root:

```bash
npm install
npm run dev -- --host 0.0.0.0 --port 5173
```

Use `http://localhost:5173/` for browser preview unless another port is chosen.

## Pre-PR Checks

Before pushing or opening a pull request:

```bash
npm run lint
npm run build
npm audit --omit=dev
```

Run `npm audit` as well when dependencies changed or before release.

For visual changes, check:

- desktop viewport
- mobile viewport around 390px wide
- any forms, CTAs, navigation, and footer links

## Pull Request Checklist

Every pull request should include:

- What changed
- Why it changed
- Vercel Preview Deployment URL
- Checks run
- Known follow-ups or external checks

Suggested checklist:

```md
## Summary
- 

## Checks
- [ ] npm run lint
- [ ] npm run build
- [ ] npm audit --omit=dev
- [ ] Vercel preview checked
- [ ] Mobile viewport checked

## Preview
Vercel URL:

## Notes
- 
```

## Vercel Deployment Model

- Branch pushes and pull requests create Preview Deployments.
- Merges to `main` create Production Deployments.
- Production environment variables may differ from preview environment variables.
- If a project uses forms, analytics, CMS, or databases, confirm both preview and production env vars.

For client/commercial sites, confirm the hosting plan permits commercial use.

## Environment Variables And Secrets

- Never commit real secrets.
- Keep `.env.local` local only.
- Add a `.env.example` file with variable names and safe placeholder values.
- Store production and preview values in the deployment provider.

## Client Launch Checklist

Before launch:

- Production domain points at the intended deployment.
- HTTPS works.
- Canonical redirects are correct.
- Forms work and send data to the correct destination.
- Security headers are present.
- Page title, meta description, Open Graph image, favicon, robots.txt, and sitemap are correct.
- Mobile and desktop smoke tests pass.
- PageSpeed Insights has been checked for the live URL.

## AI Assistant Instructions

AI assistants must:

- Read this operating procedure before making workflow, Git, deployment, or release decisions.
- Preserve existing user changes and never reset or revert unrelated work.
- Prefer branch + pull request for meaningful changes.
- Run lint/build checks before recommending a merge.
- Record external checks that require account access rather than pretending they were completed.
- Keep `README.md` and relevant docs up to date when project setup changes.

## Reusing This Procedure In Other Projects

For each client/site repo, copy or recreate these files:

- `docs/operating-procedure.md`
- `AGENTS.md`
- `CLAUDE.md`
- `AI_INSTRUCTIONS.md`
- `.github/copilot-instructions.md`
- `.github/pull_request_template.md`
- `.env.example`

Then update the project-specific `README.md` with commands, env vars, hosting notes, and launch checks.
