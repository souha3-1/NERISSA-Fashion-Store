# NERISSA Fashion Store

Frontend-only Algerian women's fashion storefront prototype for NERISSA, with editorial product discovery and simulated shopping interactions.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm --filter @workspace/nerissa-store run dev` — run the NERISSA storefront preview
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite, Wouter, Tailwind CSS, Lucide React
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/nerissa-store/src/App.tsx` — storefront routes and reusable UI
- `artifacts/nerissa-store/src/data/products.ts` — editable mock catalog and product media
- `artifacts/nerissa-store/src/store.tsx` — localStorage-persisted cart and wishlist state
- `artifacts/nerissa-store/src/index.css` — NERISSA visual tokens, typography, and responsive styling
- `artifacts/nerissa-store/public/images/` — generated fashion campaign and product imagery

## Architecture decisions

- The prototype is frontend-only by design; cart and wishlist persistence use localStorage rather than a backend.
- Product data stays separate from UI so the mock catalog can be replaced without restructuring the storefront.
- Wouter handles route-level shopping flows while the shared store context keeps cart and wishlist state consistent across pages.
- All visible prices use Algerian Dinar formatting and the brand palette is centralized in the stylesheet.

## Product

NERISSA presents editorial fashion collections for the Algerian market. Visitors can browse by collection, search and filter products, inspect product details, save wishlist items, add items to a simulated shopping bag, and submit demo newsletter/contact forms.

## User preferences

- Use “NERISSA” consistently as the official brand name.
- Keep the visual identity original, premium, minimal, and fashion-editorial rather than copying any reference brand.
- Use #662222, #842A3B, #A3485A, and #F5DAA7 as the core palette.
- Keep Algeria as the market context and display prices in DA / DZD only.

## Gotchas

- This is a prototype: do not add real payments, authentication, email delivery, or production commerce infrastructure without an explicit request.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
- See `artifacts/nerissa-store/src/data/products.ts` before editing product copy, prices, or imagery.
