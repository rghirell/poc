# My Payments

A React app consuming Mockoon-mocked payment APIs. Displays a list of payments, payment details, and installment timelines.

## Prerequisites

- Node.js >= 18
- pnpm

## Getting started

```bash
pnpm install
pnpm run dev:full   # starts Mockoon mock server + Vite dev server
```

- App: http://localhost:5173
- Mock API: http://localhost:3001

### Environment variables

| Variable       | Description          | Default                 |
| -------------- | -------------------- | ----------------------- |
| `VITE_API_URL` | Base URL of the API  | `http://localhost:3001` |

Create a `.env` file at the project root to override:

```env
VITE_API_URL=http://localhost:3001
```

## Scripts

| Command             | Description                        |
| ------------------- | ---------------------------------- |
| `pnpm run dev`      | Start Vite dev server only         |
| `pnpm run mock`     | Start Mockoon mock server on :3001 |
| `pnpm run dev:full` | Start both mock + app concurrently |
| `pnpm run build`    | Type-check + production build      |
| `pnpm test`         | Run tests                          |
| `pnpm test:watch`   | Run tests in watch mode            |
| `pnpm run lint`     | Lint with ESLint                   |
| `pnpm run lint:fix` | Auto-fix lint + format             |

## Mock API endpoints

| Method | Endpoint        | Description                                        |
| ------ | --------------- | -------------------------------------------------- |
| GET    | `/payments`     | List of payments with total amount left to pay     |
| GET    | `/payment/{id}` | Payment detail with installments, customer, orders |

3 payments are mocked: `in_progress`, `late`, and `completed`.

## Project structure

The project follows a **domain-driven** organisation:

```
src/
  domains/<domain>/        # Feature domains (e.g. payments)
    api/                   # API clients
    hooks/                 # React Query hooks
    types/                 # TypeScript interfaces
    components/            # Shared components within the domain
    pages/                 # Pages, each with co-located components
    testing/               # Test builders & helpers
  shared/                  # Cross-domain utilities (http client, formatting, layout…)
  App.tsx                  # Router setup
mocks/
  mock.json                # Mockoon mock data
```

Each page owns its components in a `components/` subfolder. Tests live in `__tests__/` next to the code they cover.

## Tech stack

- **React 19** + **TypeScript**
- **Vite** – dev server & bundler
- **React Router** – client-side routing
- **TanStack React Query** – data fetching & caching
- **Tailwind CSS** – styling
- **Vitest** + **Testing Library** – unit tests
- **Mockoon** – API mocking
- **ESLint** + **Prettier** + **Husky** – code quality
