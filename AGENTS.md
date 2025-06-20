# AGENTS.md — Guide for Codex Agent
> Purpose: act like a senior full‑stack developer who bootstraps and maintains a VPN WebApp project.  
> Stage: **Phase 1 = “Auth MVP”**.

## 1. Project overview
We are building a Telegram Mini‑App (**React**) + **Node/Express** API + **PostgreSQL** (via **Prisma**).  
Core flow:

1. Telegram WebApp opens ▸ passes `telegramId`.
2. User enters **email**.
3. API logic  
   • If user exists → return his data.  
   • Else → reserve free UID from `UidPool`, create user, add **trial‑30d** subscription.  
4. Response contains UID & subscription dates.  
5. Front shows UID, copy‑link button, QR, etc.

Everything must be **typed** (TS), well‑commented (JSDoc / TSdoc) and lint‑clean.

## 2. Directory layout (Phase 1)
```
backend/            Express API, Prisma, tests
  ├─ src/
  │   ├─ index.ts          Express bootstrap
  │   ├─ prisma.ts         Prisma client singleton
  │   └─ routes/auth.ts    POST /api/auth
  ├─ schema.prisma         DB models
  ├─ package.json
frontend/           Vite + React + Tailwind WebApp
  ├─ src/
  │   ├─ App.tsx
  │   ├─ pages/Auth.tsx    Full auth flow
  │   └─ services/api.ts   typed fetch helpers
  └─ package.json
.env.example         ← put DATABASE_URL, VITE_API_URL
README.md            Quick‑start instructions
```

## 3. Commands
| Task           | Command (shell)                            |
| -------------- | ------------------------------------------ |
| install all    | `npm install` in each package dir          |
| dev backend    | `npm run dev`  (ts-node-dev)               |
| dev frontend   | `npm run dev` (Vite)                       |
| migrate db     | `npx prisma migrate dev --name init`       |
| test backend   | `npm test`  (Jest)                         |
| lint           | `npm run lint`  (ESLint + Prettier)        |

The agent must ensure these commands succeed before committing.

## 4. Quality rules
* ESLint/Prettier zero warnings.  
* All code **typed** (`"strict": true` in tsconfig).  
* Meaningful commit messages (`feat:`, `fix:`, `chore:`).  
* Each feature → separate branch + PR; default branch = **main**.  
* Add unit tests for every route & util; **90 % coverage** threshold.  
* Leave inline TODOs for next phases, prefixed with `// TODO(P2):`.

## 5. Data models (Prisma)
_Implement exactly as defined; can extend in later phases._

```
model User        { id Int @id @default(autoincrement()) telegramId BigInt @unique email String @unique uid String @unique createdAt DateTime @default(now()) subscriptions Subscription[] }
model Subscription{ id Int @id @default(autoincrement()) userId Int plan String startDate DateTime @default(now()) endDate DateTime isActive Boolean @default(true) user User @relation(fields:[userId],references:[id]) }
model UidPool     { uid String @id userId Int? @unique user User? @relation(fields:[userId],references:[id]) inUse Boolean @default(false) }
```

## 6. Environment
```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/vpn"
PORT=9000
VITE_API_URL="http://localhost:9000"
```

## 7. CI hints (future)
After Phase 1, add GitHub Actions:
* `backend-test.yml` → install, lint, migrate, test  
* `frontend-test.yml` → install, lint, build

## 8. Out of scope (Phase 1)
* Payment, subscription renewal  
* Kubernetes manifests  
* Production Docker  
* Internationalisation
