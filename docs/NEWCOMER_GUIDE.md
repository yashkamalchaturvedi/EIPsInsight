# EIPs Insight — Newcomer Guide

Welcome! This guide introduces the codebase structure, where to start, and how to keep documentation accurate over time.

## 1. What this project is

EIPs Insight is a Next.js application for browsing and exploring Ethereum Improvement Proposals (EIPs). It provides search, filtering, analytics, and detail views, plus links back to the official EIP repository and discussions.

## 2. Top-level structure (repo root)

- **Configuration & build:** `next.config.mjs`, `tsconfig.json`, `tailwind.config.js`, `postcss.config.js`, `middleware.ts`, `vercel.json`
- **Dependencies & scripts:** `package.json`
- **Docs:** `README.md` (overview), `CONTRIBUTE.md` (workflow), `docs/NEWCOMER_GUIDE.md` (this guide)

## 3. Application structure (`src/`)

### Routing
This repo uses **both** routing systems:

- **App Router (`src/app/`)**
  - Includes `layout.tsx`, `globals.css`, and app-wide providers.
- **Pages Router (`src/pages/`)**
  - Contains most feature routes (EIPs, analytics, profiles, etc.).

When adding new routes, prefer the router already used in the closest related area to avoid duplicating layout logic.

### Shared UI & data layers

- `src/components/` — shared UI building blocks
- `src/services/` — data access and API helpers
- `src/models/`, `src/userModels/` — domain and user models
- `src/stores/` — app state management
- `src/hooks/`, `src/utils/`, `src/lib/` — reusable logic and helpers
- `src/data/` — fixtures and static data sources
- `src/constants/` — shared constants

## 4. Key dependencies to know

The UI and data stack is broad. Commonly touched areas include:

- **UI:** Chakra UI, MUI, Radix UI, Tailwind
- **Charts:** Chart.js, D3, Recharts, AntV
- **State/data:** Redux, React Query, Axios
- **Auth & APIs:** NextAuth, Supabase, MDX tooling

If you introduce a new dependency, document it in the README and include a short justification in the PR.

## 5. Environment variables

Environment configuration lives in `.env.local`. Start by copying `.env.example`:

```bash
cp .env.example .env.local
```

### Required for core functionality

- `MONGODB_URI`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`
- `GITHUB_TOKEN` or `ACCESS_TOKEN`

### Optional (feature-specific)

Variables for analytics, OAuth providers, email, and payments are listed in `.env.example`. Only configure what you plan to use locally.

## 6. Suggested learning path

1. **Routing and layout**
   - `src/app/layout.tsx`
   - representative routes in `src/pages/`
2. **UI building blocks**
   - `src/components/`
3. **Data flow**
   - `src/services/` + `src/models/`
4. **State management**
   - `src/stores/`
5. **Utilities and hooks**
   - `src/hooks/`, `src/utils/`

## 7. Where to add new work

- **New UI component:** `src/components/`
- **New page/route:** `src/pages/` (or `src/app/` if already using the App Router in that area)
- **New data integration:** `src/services/` + `src/models/`
- **App-wide styles:** `src/app/globals.css` or Tailwind config

## 8. Keeping docs healthy

- Update `.env.example` when adding or renaming environment variables.
- Document new scripts in the README.
- Keep this guide focused on structure and onboarding so it stays easy to scan.
