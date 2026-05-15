# Repository Admin Checklist

This file tracks account-side setup that cannot be completed safely from local Git alone.

## Current Status

- GitHub default branch is `main`.
- Local and remote `main` are in use.
- The review pull request has been merged into `main`.
- Retired local and remote branches have been deleted/pruned.
- Vercel production branch tracking is set to `main`.
- Vercel preview deployments are enabled and working for pull request branches.
- Vercel Production and Preview environment variables use the same Supabase project intentionally for now.
- Canonical global SOP exists at `C:\Development\_shared\website-operating-procedure.md`.

## Must Do In GitHub

Completed for this repo:

1. GitHub default branch changed from `master` to `main`.
2. Review pull request merged into `main`.
3. Retired remote branches deleted.
4. Retired local branches deleted.

Recommended branch protection for a solo/client workflow:

- Require pull request before merging into `main`.
- Require status checks if GitHub Actions or another CI is later added.
- Do not require multiple approvals while working solo.
- Allow admins to bypass only if you deliberately want emergency override.

## Must Do In Vercel

Completed for this repo:

1. Connected Git repository confirmed.
2. Production branch set to `main`.
3. Preview deployments confirmed for pull request branches.
4. Production and Preview environment variables configured.
5. Merge to `main` creates the Production Deployment.

Ongoing rule:

- Deploy from `main` only when ready for production.

Normal release path:

- Branch push creates a Preview Deployment.
- Pull request review uses the preview URL.
- Merge to `main` creates the Production Deployment.

Avoid using "Promote to Production" as the normal release path, because it can make production differ from the Git `main` branch.

## Must Do In Supabase

Completed for this repo:

1. Row Level Security is enabled on the `enquiries` table.
2. Anonymous/browser users can insert rows into `enquiries`.
3. Anonymous/browser users cannot select, update, or delete rows in `enquiries`.
4. Database constraints match the frontend form expectations.
5. Required fields are enforced server-side as well as in the browser.
6. The Vercel `VITE_SUPABASE_URL` value matches the Supabase project allowed in `vercel.json`.
7. The Vercel `VITE_SUPABASE_ANON_KEY` value is a publishable/anon key, not a secret or service role key.
8. Spam expectations are acceptable for launch, with the current frontend honeypot treated as lightweight protection rather than a complete anti-spam system.

Current intentional setup:

- Production and Preview use the same Supabase project.
- Test submissions from preview deployments may land in the same table as production submissions.

Ongoing rule:

- Keep the current frontend honeypot as lightweight spam protection for launch. Add stronger protection, such as Cloudflare Turnstile, reCAPTCHA, rate limiting, or a serverless form endpoint, if spam becomes a real issue.

## Remaining External Checks

These are not blockers for the current GitHub/Vercel/Supabase setup, but should be done before or shortly after the real custom domain launch:

1. Submit one test enquiry on the production Vercel URL and confirm it appears in Supabase.
2. Confirm Vercel Analytics is receiving data after the production site has real visits.
3. Run PageSpeed Insights or Lighthouse against the correct live URL after DNS points at the new site.
4. Check Google Search Console Core Web Vitals once field data is available.
5. Smoke test on real iPhone Safari and Android Chrome.
6. Confirm custom domain, HTTPS redirects, and HSTS readiness before enabling any preload-related DNS/browser commitments.

## Current Project Pull Request Flow

Use this flow for future meaningful changes:

1. Create a feature branch from `main`.
2. Push the branch to GitHub.
3. Review the Vercel Preview Deployment.
4. Open a pull request into `main`.
5. Merge only after checks and preview review pass.
6. Confirm the Production Deployment from `main`.
7. Delete the merged feature branch.

## Repeat For Other Projects

For each other site/client repo:

1. Confirm the production branch is `main`.
2. Add the shared operating procedure and AI instruction files.
3. Add a PR template.
4. Add `.env.example`.
5. Confirm `.gitignore` excludes local env files, build output, dependencies, and local AI/tool artifacts.
6. Confirm Vercel production branch is `main`.
7. Confirm preview deployments work from branches/PRs.
8. Document project-specific env vars and launch checks in `README.md`.
