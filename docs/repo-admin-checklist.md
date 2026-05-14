# Repository Admin Checklist

This file tracks account-side setup that cannot be completed safely from local Git alone.

## Current Status

- Local branch `main` has been created from the old `master` branch.
- Remote branch `origin/main` has been pushed.
- The current review work remains on `review-must-should-fixes-20260513`.
- `master` still exists locally and remotely until GitHub's default branch is changed.
- Canonical global SOP exists at `C:\Development\_shared\website-operating-procedure.md`.

## Must Do In GitHub

1. Go to GitHub repo settings.
2. Change the default branch from `master` to `main`.
3. Check any open pull requests and retarget them to `main` if needed.
4. After confirming nothing depends on `master`, delete the remote `master` branch.
5. Optionally delete the local `master` branch after the remote default branch is changed.

Recommended branch protection for a solo/client workflow:

- Require pull request before merging into `main`.
- Require status checks if GitHub Actions or another CI is later added.
- Do not require multiple approvals while working solo.
- Allow admins to bypass only if you deliberately want emergency override.

## Must Do In Vercel

1. Open the Vercel project settings.
2. Confirm the connected Git repository is correct.
3. Set the production branch to `main`.
4. Confirm preview deployments are enabled for pull requests/branches.
5. Confirm production and preview environment variables are set correctly.
6. Deploy from `main` only when ready for production.

Normal release path:

- Branch push creates a Preview Deployment.
- Pull request review uses the preview URL.
- Merge to `main` creates the Production Deployment.

Avoid using "Promote to Production" as the normal release path, because it can make production differ from the Git `main` branch.

## Current Project Pull Request Flow

The current review branch is:

```text
review-must-should-fixes-20260513
```

After GitHub default branch is changed to `main`, open or retarget the pull request from this branch into `main`.

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
