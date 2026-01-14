# EIPs Insight

EIPs Insight is a Next.js application for browsing and exploring Ethereum Improvement Proposals (EIPs). It aggregates EIP metadata, provides searchable and filterable views, and links back to the official discussions and source documents.

## Project Overview

Key features include:

- Searchable, filterable lists of EIPs.
- Detail views with status, author, and description metadata.
- Categorized browsing by type and status.
- Links to official repositories and discussion threads.

## Quick Start

### Prerequisites

- Node.js `>=18`
- npm `>=8`

### Install and run

```bash
git clone https://github.com/AvarchLLC/EIPsInsight.git
cd EIPsInsight
npm install
npm run dev
```

The app will be available at `http://localhost:3000`.

## Environment Variables

Copy `.env.example` to `.env.local` and fill in the values you need. The app can run with minimal configuration for basic browsing, but API-backed features (auth, analytics, email, payments) require additional secrets.

```bash
cp .env.example .env.local
```

See `docs/NEWCOMER_GUIDE.md` for details on required vs optional variables and where they are used.

## Useful Scripts

- `npm run dev` — start the local dev server.
- `npm run build` — build for production.
- `npm run start` — run the production build locally.
- `npm run lint` — run Next.js linting.
- `npm run test` — run Node test runner against `tests/**/*.test.ts`.
- `npm run create-admin` — provision an admin user.
- `npm run migrate-blogs` — migrate static blog content.

## Repo Tour

- `src/app/` — App Router entry points (`layout.tsx`, global styles, error pages).
- `src/pages/` — Pages Router routes (legacy and feature-rich pages).
- `src/components/` — shared UI components.
- `src/services/` + `src/models/` — data fetching and domain models.
- `src/stores/` — app state management.
- `src/hooks/`, `src/utils/`, `src/lib/` — reusable hooks and utilities.

## Contributing

Please read `CONTRIBUTE.md` for branch strategy, workflow, and PR guidelines.

## Deployment

Deployments are handled via Vercel for preview builds and an NGINX-backed production environment. See `CONTRIBUTE.md` for branch routing and release flow.

## Contributors

- Dhanush Naik [(@dhanushlnaik)](https://www.github.com/dhanushlnaik)
- Nandan R Pai [(@nandanpi)](https://github.com/nandanpi)
- Viwin [(@viwinkumarpadala)](https://github.com/viwinkumarpadala)
- Arjun [(@Arjundotadex)](https://github.com/Arjundotadex)
- Priti Tiwari [(@prititi)](https://github.com/prititi)

---

Thanks for helping improve the EIPs Insight ecosystem. If you run into issues, open an issue with reproduction steps or reach out to the maintainers.
