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
- SOP-required repo files confirmed present: `AGENTS.md`, `AI_INSTRUCTIONS.md`, `.env.example`, `.github/copilot-instructions.md`, `.github/pull_request_template.md`.

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
8. Rate limiting trigger added: blocks more than 3 submissions from the same email address within a 1-hour window.

Current intentional setup:

- Production and Preview use the same Supabase project.
- Test submissions from preview deployments may land in the same table as production submissions.

Ongoing rule:

- Honeypot plus the database rate limit trigger are the current spam protections. Add Cloudflare Turnstile, reCAPTCHA, or a serverless endpoint if spam becomes a real problem after launch.

## Security Hardening

Completed for this repo:

1. `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, and `Permissions-Policy` set in `vercel.json`.
2. `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload` added to `vercel.json`.
3. `Content-Security-Policy` added to `vercel.json` — allowlists Google Fonts, Supabase project, and Vercel Analytics; blocks all other origins.
4. Static file cache-control regex corrected to match actual filenames in `/public/`.
5. Form max-length constraints added to Zod schema (`name`/`company`: 100, `email`: 254, `message`: 5000).

Remaining:

- After DNS is live, run the deployed URL through [securityheaders.com](https://securityheaders.com) to confirm all headers are applied correctly in production.

## Remaining External Checks

Before DNS cutover (on the Vercel preview URL):

1. Run `npm audit --omit=dev` locally and resolve any high or critical vulnerabilities.
2. Run `npm run lint` and `npm run build` and confirm both pass cleanly.
3. Run PageSpeed Insights or Lighthouse against the Vercel preview URL (lab data only at this stage; field data accumulates after real traffic on the live URL).
4. Confirm security headers on the Vercel preview URL via [securityheaders.com](https://securityheaders.com).
5. Smoke test on real iPhone Safari and real Android Chrome against the Vercel preview URL.
6. Submit one test enquiry on the Vercel preview URL and confirm it appears in Supabase.

DNS cutover:

7. **DNS** — Point `moxify.co.uk` DNS records to Vercel. This is the final go-live step.

Shortly after DNS cutover:

8. Confirm the live URL loads correctly and HTTPS works.
9. Confirm Vercel Analytics is receiving data.
10. Re-run PageSpeed Insights against the live URL to confirm production performance.

Post-launch:

11. **Google Search Console** — Verify the `moxify.co.uk` domain and submit `https://moxify.co.uk/sitemap.xml`. Check Core Web Vitals once field data is available (typically 28 days after real traffic).
12. **Analytics decision** — Decide whether Vercel Analytics alone is sufficient or whether to add GA4 or Plausible. Vercel Analytics is already active and cookie-free. Adding GA4 would require a cookie consent banner.
13. **Resend DNS** — Add DNS records for `moxify.co.uk` so contact form notification emails send from a Moxify address rather than `onboarding@resend.dev`.

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
