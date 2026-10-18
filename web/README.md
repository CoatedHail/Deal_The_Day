# Deal the Day — web app

The Next.js app behind [deal-the-day.vercel.app](https://deal-the-day.vercel.app). See the [repository README](../README.md) for what the project is and how the code is organized.

## Running locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npx tsc --noEmit   # typecheck
```

The app works without any environment variables: signed-out data is kept in the browser. To enable Google sign-in and server-side storage, set up the database below.

## Database

Copy `.env.example` to `.env.local` and fill it in. The schema lives in
`src/db/schema.ts`; after changing it, push the change to Neon. `drizzle-kit`
does not read `.env.local` on its own, so load it first:

```bash
set -a && . ./.env.local && set +a && npm run db:push
```

`db:push` compares the schema against the live database and applies the
difference. It will happily drop a column to make them match, so read what it
says it is about to do before confirming. Once real families have records,
switch to generated migrations (`npx drizzle-kit generate`) instead.
