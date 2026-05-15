# Website Project Operating Procedure

Canonical shared SOP path:

```text
C:\Development\_shared\website-operating-procedure.md
```

This repo-local file is a project copy of the shared SOP. If the shared SOP changes, update this file or replace it with the latest shared version.

This procedure is intended for small client websites built by one person, with enough structure that another developer or AI assistant can step in safely.

## AI Bootstrap Rule

If an AI assistant is asked to "read the global SOP and follow it", that instruction means:

1. Read the global SOP first.
2. Inspect the current repo before asking questions.
3. Create or update the required repo-local workflow files:
   - `AGENTS.md`
   - `CLAUDE.md`
   - `AI_INSTRUCTIONS.md`
   - `.github/copilot-instructions.md`
   - `.github/pull_request_template.md`
   - `.env.example`
   - `docs/repo-admin-checklist.md`
   - relevant `README.md` workflow/setup/deployment sections
4. Treat `docs/repo-admin-checklist.md` as the repo's living task, to-do, owner-action, and admin checklist for the full project lifecycle.
5. When the project owner asks to add something to "the checklist", "tasks", "to-dos", "remaining items", or similar, add it to `docs/repo-admin-checklist.md` unless they clearly name a different file.
6. Identify project-specific setup gaps and document them.
7. Ask before running checks.
8. Ask before any networked, external, GitHub, Vercel, Supabase, DNS, Search Console, deploy, push, merge, branch deletion, dependency install/update, or destructive action.
9. Do not mark external checks complete unless they were actually run against the correct project/site.
10. Leave a clear summary of completed setup and remaining owner actions.

The project owner should only need to say:

```text
Read the global SOP and follow it for this project.
```

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

## Default Lightweight Website Stack

For new lightweight client websites, use this stack unless the project brief says otherwise:

- React with Vite for the frontend.
- TypeScript by default; use JavaScript only for very small sites or existing JavaScript projects where TypeScript would add unnecessary migration work.
- Tailwind CSS for styling.
- GitHub for source control.
- GitHub Flow with `main` as the production branch.
- Vercel for hosting, preview deployments, and production deployments.
- Supabase for forms, simple data storage, auth, or lightweight backend needs.
- Sanity for CMS-managed content when a site needs client-editable pages, posts, case studies, team profiles, resources, or similar structured content.
- Vercel Analytics for lightweight analytics, with Google Search Console and PageSpeed Insights for search and Core Web Vitals checks.
- npm unless the existing project already uses another package manager.

For existing projects, inspect and respect the current stack first. If the stack differs from this standard, clearly report what is different, explain the practical implications, and ask the owner before changing, migrating, or standardising it.

Do not introduce Docker by default for these lightweight sites. Docker is only needed when a project has a clear reason, such as a custom backend, local database stack, complex services, or container-based deployment requirements.

When Supabase is used, document tables, RLS policies, permissions, database constraints, and preview/production environment variables. When Sanity is used, document datasets, schemas, Studio access, preview/production environment variables, and the editorial workflow.

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

Before pushing or opening a pull request, ask the project owner before running checks. Once approved, run:

```bash
npm run lint
npm run build
npm audit --omit=dev
```

Run `npm audit` as well when dependencies changed or before release, but ask before running it because it may use network access and registry quota.

For visual changes, check:

- desktop viewport
- mobile viewport around 390px wide
- any forms, CTAs, navigation, and footer links

## Check Consent Rules

AI assistants must not run checks or actions that affect external services, spend quota, deploy, publish, or change account-side settings without asking first.

Safe to inspect without asking:

- Read project files.
- Search the repo.
- Inspect Git status, branches, diffs, and local config.
- Explain what checks should be run.

Ask before running:

- `npm install` or any dependency install/update.
- `npm audit`, PageSpeed Insights, Lighthouse against live URLs, or any networked check.
- Vercel, GitHub, Supabase, DNS, Search Console, analytics, or hosting account actions.
- Git push, merge, branch deletion, release tagging, or deployment promotion.
- Any command that sends form submissions, test emails, or data to an external service.
- Any destructive or hard-to-undo command.

Local checks such as `npm run lint`, `npm run build`, and local browser previews should still be announced first. If the owner has explicitly asked for a review, PR readiness check, or pre-production check, that counts as approval for local lint/build/preview checks only, not for external or account-side actions.

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

## Living Repo Checklist

Every repo following this SOP must have:

```text
docs/repo-admin-checklist.md
```

Use this file as the project's living task and owner-action tracker. It should include:

- account-side setup items for GitHub, Vercel, Supabase, DNS, analytics, Search Console, and other external tools
- launch, pre-production, and post-launch checks
- outstanding technical, content, design, SEO, accessibility, performance, and security items
- decisions made, intentional tradeoffs, and deferred nice-to-have work
- tasks the owner needs to do outside the codebase
- tasks future AIs or developers should pick up later

When the owner says "add this to the checklist", "add this to tasks", "put this on the to-do list", or similar, update `docs/repo-admin-checklist.md` by default. Keep the checklist current as work is completed, deferred, or discovered.

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

## Pre-Production Checklist

Before launch or production merge, ask the project owner which checks they want run now. Do not run external checks, deploy, or change account settings without explicit approval.

Local code and build checks:

- Confirm working tree status and note unrelated local changes.
- Run `npm run lint`.
- Run `npm run build`.
- Run dependency audit after approval: `npm audit --omit=dev`; run full `npm audit` before release or when dependencies changed.
- Start a local preview at `localhost` and smoke test the site.

Visual and responsive checks:

- Check desktop viewport.
- Check mobile viewport around 390px wide.
- Check tablet or mid-width breakpoint if the layout changes significantly.
- Confirm no important text clips, overflows, overlaps, or becomes unreadably small.
- Confirm hero/above-the-fold content is visible without waiting for client-side animation.

Forms and interactive behavior:

- Confirm required-field validation.
- Confirm invalid email and min/max length validation.
- Confirm submit buttons prevent duplicate submission.
- Confirm success/error/fallback states.
- Confirm any real external submission target only after approval.
- Confirm backend/database rules match the front end limits.

Environment and deployment readiness:

- Confirm `.env.example` lists required variables with safe placeholders.
- Confirm `.env.local` is ignored and not committed.
- Confirm Vercel or hosting preview and production environment variables are configured.
- Confirm production branch is `main`.
- Confirm branch/PR previews are enabled.
- Confirm merge to `main` is the normal production release path.

Security and privacy:

- Confirm security headers are configured locally or in hosting config.
- Confirm deployed headers after the site is deployed.
- Confirm Content Security Policy allows required fonts, analytics, APIs, images, and form endpoints.
- Confirm no secrets, private keys, or personal data are committed.
- Confirm form/database permissions, RLS policies, or backend access rules are production-safe.

SEO and launch basics:

- Confirm page title and meta description.
- Confirm canonical URL.
- Confirm Open Graph/Twitter image and metadata.
- Confirm favicon and app icons.
- Confirm `robots.txt` and `sitemap.xml`.
- Confirm domain, HTTPS, redirects, and HSTS readiness.

Performance and Core Web Vitals:

- Run PageSpeed Insights or Lighthouse only after approval and only against the correct URL.
- Run against the Vercel preview URL before DNS cutover to catch performance issues early (lab data only at this stage).
- Re-run against the live URL after DNS cutover to confirm production performance. Field data (real Chrome user measurements) will only appear in PageSpeed Insights once the live URL has accumulated real traffic, typically after several weeks.
- Check LCP, INP, and CLS against Google's current Core Web Vitals thresholds.
- Investigate bundle size only if lab or field data shows JavaScript is a material bottleneck.

External checks to record separately:

- Production domain points at the intended deployment.
- HTTPS works.
- Canonical redirects are correct.
- Forms send data to the correct destination.
- Security headers confirmed on the Vercel preview URL using securityheaders.com before DNS cutover.
- Security headers re-confirmed on the live URL using securityheaders.com after DNS cutover.
- PageSpeed Insights has been checked against both the Vercel preview URL and the live URL.
- Real-device checks are complete on iPhone Safari and Android Chrome against the Vercel preview URL before DNS cutover.
- Google Search Console or analytics checks are complete when available.

## AI Assistant Instructions

AI assistants must:

- Read this operating procedure before making workflow, Git, deployment, or release decisions.
- Preserve existing user changes and never reset or revert unrelated work.
- Prefer branch + pull request for meaningful changes.
- Ask before running checks, especially external/networked checks, account-side actions, deploys, or destructive commands.
- Run approved lint/build checks before recommending a merge.
- Record external checks that require account access rather than pretending they were completed.
- Keep `docs/repo-admin-checklist.md` current as the living task/to-do tracker when new work, owner actions, or follow-ups are identified.
- Keep `README.md` and relevant docs up to date when project setup changes.

## Reusing This Procedure In Other Projects

For each client/site repo, copy or recreate these files:

- `docs/operating-procedure.md`
- `docs/repo-admin-checklist.md`
- `AGENTS.md`
- `CLAUDE.md`
- `AI_INSTRUCTIONS.md`
- `.github/copilot-instructions.md`
- `.github/pull_request_template.md`
- `.env.example`

Then update the project-specific `README.md` with commands, env vars, hosting notes, and launch checks.
