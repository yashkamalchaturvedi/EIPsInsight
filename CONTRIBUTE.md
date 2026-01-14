# Contributing to EIPs Insight

Thanks for your interest in contributing to EIPs Insight! This guide describes the branch strategy, workflow, and expectations for pull requests so new contributors and long-term maintainers can stay aligned.

## Repository Workflow

### `dev` branch (preview/staging)
- All new work lands in `dev`.
- Vercel preview deployments run from `dev` for testing and review.

### `main` branch (production)
- Only maintainers merge into `main`.
- `main` is deployed to the production NGINX server at https://eipsinsight.com.

## Contribution Steps

1. **Fork the repository**
   Use the GitHub UI to create your fork.

2. **Clone your fork**

   ```bash
   git clone https://github.com/YOUR_USERNAME/EIPsInsight.git
   cd EIPsInsight
   ```

3. **Add the upstream remote**

   ```bash
   git remote add upstream https://github.com/AvarchLLC/EIPsInsight.git
   ```

4. **Create a feature branch**

   ```bash
   git checkout -b feat/your-feature-name
   ```

5. **Sync with upstream `dev`**

   ```bash
   git fetch upstream
   git checkout dev
   git merge upstream/dev
   ```

6. **Bring changes into your feature branch**

   ```bash
   git checkout feat/your-feature-name
   git merge dev
   # or
   git rebase dev
   ```

7. **Make changes and test locally**

   ```bash
   npm install
   npm run dev
   ```

8. **Push to your fork and open a PR**

   ```bash
   git push origin feat/your-feature-name
   ```

   - Open the PR against `AvarchLLC/EIPsInsight` **`dev`**, not `main`.
   - Include a clear title, summary, and screenshots for UI changes.

## Review and Release

- Maintainers review changes on the `dev` preview build.
- Once validated, maintainers merge into `main` and publish to production.

## Tips for Long-Term Maintenance

- Keep PRs small and focused.
- Rebase frequently to avoid drift from `dev`.
- Document new scripts, environment variables, or data flows in `docs/NEWCOMER_GUIDE.md`.
- Add or update tests when touching data logic or critical components.

Thanks again for helping improve the EIPs Insight ecosystem!
