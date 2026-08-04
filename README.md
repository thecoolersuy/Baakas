
<div align="center">
  <h2 align="center"><b>Baakas</b></h2>
  <p align="center">
    Optimized e-commerce shopping platform built to solve real frontend engineering issues using Tanstack for data caching and state synchronization & Zustand for centralized global store with selector functions to pick only the exact pieces of state I need.
    <br />
    <a href="https://excalidraw.com/#json=t_Y7KtRHiLpjksd0vnUp7,GODaBKrL6myNkDo0KPvG-w"><strong>Explore the Architecture Diagrams »</strong></a>
    <br />
    <br />
    <a href="https://baakas-kappa.vercel.app/">View Live Site</a>
  </p>
</div>

---

### Built With

[![React][React-badge]][React-url]
[![TypeScript][TS-badge]][TS-url]
[![TanStack Query][Query-badge]][Query-url]
[![Tailwind CSS][Tailwind-badge]][Tailwind-url]
![Zustand][Zustand]
[![Vite][Vite-badge]][Vite-url]
[![Vitest][Vitest-badge]][Vitest-url]
![Redux][Redux]

---

## What I Built

Baakas is a full e-commerce shopping experience — product browsing, debounced search, category filtering, pagination, product detail pages, and a persistent cart. Data comes from a live REST API (DummyJSON — 1000+ real products).

The goal wasn't to build "another shopping site." It was to solve the real engineering problems that show up when you build one properly.

---

## Problems I Solved

**Search was hammering the API on every keystroke**
Built a custom `useDebounce` hook with a 400ms delay. Typing "bookshelf" (9 letters) went from 9 API calls to 1. The hook uses `useEffect` cleanup to cancel pending timers — so only the final value after the user stops typing triggers a request.

**20 ProductCards re-rendering on every keystroke**
Without optimisation, every search keystroke caused all 20 visible cards to re-render even when their data hadn't changed. Applied `React.memo` on `ProductCard` and `CartItem` with selector-based Zustand subscriptions — only the component whose specific data changed would re-render.

**Product grid went blank between filter changes**
Switching category filters cleared the grid while new data loaded, causing a jarring blank flash. Configured TanStack Query's `placeholderData` to retain previous results during refetch — the old data stays visible until the new data arrives.

**Entire JS bundle downloaded on first visit**
Every page's code was bundled together and sent upfront. Implemented route-based code splitting with `React.lazy` so each page becomes a separate chunk. Added speculative preloading on nav link hover — chunks start downloading before the user even clicks.

**Images were loading all at once and blocking render**
Built a `LazyImage` component using the Intersection Observer API. Images only download when they're within 100px of the viewport. Added graceful degradation — if the API doesn't exist (jsdom in tests, SSR environments), it falls back to eager loading automatically.

**Cart disappeared on every page refresh**
Zustand's `persist` middleware with `createJSONStorage` serializes cart state to localStorage on every change and rehydrates it on mount. Zero extra code needed in any component.

**IntersectionObserver was crashing all ProductCard tests**
jsdom doesn't implement browser viewport APIs, so every ProductCard test was throwing `IntersectionObserver is not defined`. The `LazyImage` graceful degradation fix solved this simultaneously — the component detects the missing API and skips the observer entirely.

---
## Key Technical Decisions

| Decision | Reasoning |
|---|---|
| TanStack Query over `useEffect` + fetch | Caching, deduplication, background refetch and retry — all free |
| Zustand over Redux | Same mental model, fraction of the boilerplate |
| `staleTime: 5min` on product queries | Products don't change every second — no point hitting the API on every visit |
| `staleTime: 30min` on categories | Categories almost never change — cache aggressively |
| Manual vendor chunks in Vite | React and third-party libs stay cached across deployments even when app code changes |
| Vitest over Jest | Identical API, native Vite integration, no config wrestling |
| `placeholderData` on paginated queries | Keeps previous page visible while next page loads — no blank flash |
| Selector-based Zustand subscriptions | Components only re-render when their specific slice of state changes |

---

## System Diagrams

Designed in Excalidraw before writing code to understand the full data flow.

| Diagram | What it shows |
|---|---|
| [React Query cache flow](https://excalidraw.com/#json=t_Y7KtRHiLpjksd0vnUp7,GODaBKrL6myNkDo0KPvG-w) | How components → custom hooks → React Query → API connects |
| [UML sequence — product detail](https://excalidraw.com/#json=t_Y7KtRHiLpjksd0vnUp7,GODaBKrL6myNkDo0KPvG-w) | useParams → useProduct → API → re-render sequence |
| [Rendering tactics](https://excalidraw.com/#json=t_Y7KtRHiLpjksd0vnUp7,GODaBKrL6myNkDo0KPvG-w) | CSR vs SSR vs ISR — when to use each |
| [Memoization architecture](https://excalidraw.com/#json=t_Y7KtRHiLpjksd0vnUp7,GODaBKrL6myNkDo0KPvG-w) | React.memo + useCallback — the paired pattern explained |
| [Code splitting flow](https://excalidraw.com/#json=t_Y7KtRHiLpjksd0vnUp7,GODaBKrL6myNkDo0KPvG-w) | React.lazy + Suspense under the hood |

> Full interactive diagrams: [Open in Excalidraw](https://excalidraw.com/#json=t_Y7KtRHiLpjksd0vnUp7,GODaBKrL6myNkDo0KPvG-w)

---
### Reach out to me on: 
https://suyalsahukhal.vercel.app/

[React-badge]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[TS-badge]: https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white
[TS-url]: https://www.typescriptlang.org/
[Query-badge]: https://img.shields.io/badge/TanStack_Query-160440?style=for-the-badge&logo=react-query
[Query-url]: https://tanstack.com/query
[Zustand-badge]: https://img.shields.io/badge/Zustand-000000?style=for-the-badge&logo=react&logoColor=white
[Zustand-url]: https://zustand-demo.pmnd.rs/
[Tailwind-badge]: https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white
[Tailwind-url]: https://tailwindcss.com/
[Vite-badge]: https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white
[Vite-url]: https://vitejs.dev/
[Vitest-badge]: https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white
[Vitest-url]: https://vitest.dev/
[Redux]: https://img.shields.io/badge/-react_redux-563D7C?style=for-the-badge&labelColor=563D7C&logo=redux&logoColor=FFFFFF
[React-Query-url]: https://tanstack.com
[Zustand]: https://img.shields.io/badge/Zustand-FF2D20?style=for-the-badge&logo=react&logoColor=white
[Zustand-url]: https://pmnd.rs
