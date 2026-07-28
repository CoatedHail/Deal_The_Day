# Deal the Day

Digital companion to the Deal the Day family card game — a therapeutic game that
helps parents with OCD or OCPD traits practise tolerating uncertainty alongside
their children, using principles from Exposure and Response Prevention (ERP).

This site does not replace the physical deck. It is the part that happens around
it: recording what you expect before an activity, what actually happened
afterwards, and what changed over time.

> **Not a medical device.** Educational companion only — not a substitute for
> professional mental health treatment, diagnosis, or therapy.

## Repository layout

```
web/     Next.js site — the companion website (deploys to Vercel)
```

A separate backend service may be added later as a sibling directory; the layout
is set up so that it can be deployed independently without disturbing `web/`.

## Running the site locally

```bash
npm --prefix web install
npm --prefix web run dev
```

Then open http://localhost:3000.

Other commands:

```bash
npm --prefix web run build   # production build
npm --prefix web run lint    # eslint
npx --prefix web tsc --noEmit  # typecheck
```

## Stack

- **Next.js 15** (App Router) with React 19 and TypeScript
- **Tailwind CSS v4**, with design tokens defined in `web/src/app/globals.css`
- No UI or charting dependencies — components and charts are hand-rolled

## How the code is organised

| Path | What lives there |
|---|---|
| `web/src/app` | Routes. One folder per URL segment. |
| `web/src/components/ui` | Reusable primitives (Button, Card, RatingScale…) |
| `web/src/components/charts` | Inline-SVG charts |
| `web/src/components/layout` | App shell, navigation, page headers |
| `web/src/components/providers` | Settings and data React contexts |
| `web/src/content` | Written material as structured data |
| `web/src/lib` | Domain types, storage, stats, date helpers |

### Data storage

All user data currently lives in `localStorage` behind a `DataRepository`
interface (`web/src/lib/storage.ts`). The interface is async so that an
API-backed implementation can be swapped in later without touching any
component.

Nothing is uploaded anywhere and there is no account system.

### Content

Articles in `web/src/content` are structured data, not MDX, so the same blocks
can be rendered on the web and folded into printable worksheets. Entries marked
`status: "placeholder"` render their planned outline plus a visible notice
rather than pretending to be finished — deliberate, because a half-written
explanation of a mental health concept is worse than none.

## Accessibility

Accessibility is a product requirement here, not a polish pass:

- Dyslexia-friendly mode with wider letter, word and line spacing
- Four text sizes, driven by a root font scale so nothing breaks
- Separate high-contrast mode that combines with dark mode
- Motion reduction, both automatic and user-forced
- Chart colours validated for lightness, contrast and colour-vision separation

## Deployment

`web/` deploys to Vercel with **Root Directory** set to `web`. Every push to
`main` triggers a deploy.
