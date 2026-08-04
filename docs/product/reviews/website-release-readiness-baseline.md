# Website release-readiness baseline

Review date: 2026-08-04\
Owner: Web - HQ task\
Outcome: **Achieved, with the physical-device limitations recorded below.**\
Recommendation to Web - HQ: **Ship** after owner review; Web - HQ retains the
final decision.

## Baseline and scope

The current home and Pricing experience is evaluated against WCAG 2.2 Level AA
and the browser/viewport policy in
[Website support policy](../website-support-policy.md). The sprint remained
limited to the two existing routes, their shared navigation, the three accepted
gaps, and focused regression coverage.

## Changes accepted

- Pricing eyebrow text now uses `#1776d7`, preserving the existing blue visual
  character while increasing white-background contrast from 3.37:1 to 4.56:1.
- The Pricing description now ends with a period.
- Desktop and mobile Pricing links expose `aria-current="page"` on `/pricing`.
- A Playwright smoke suite covers route health, representative viewports,
  navigation, mobile-menu closure/focus behavior, and reduced motion.
- Generated Playwright reports and test results are excluded from source
  control.

Implementation and evidence paths:

- `app/pricing/page.tsx`
- `app/components/site-header.tsx`
- `app/globals.css`
- `tests/smoke/website.spec.ts`
- `playwright.config.ts`
- `docs/product/website-support-policy.md`

## Verification results

| Check | Result | Evidence |
| --- | --- | --- |
| Pricing contrast | **Pass** | `#1776d7` on white calculates to 4.56:1; normal text requires 4.5:1. |
| Pricing punctuation | **Pass** | Production DOM text ends with “to life.” |
| Pricing current-page state | **Pass** | Production DOM contains the visible Pricing link with `aria-current="page"` on desktop and in the open mobile menu. |
| Home and Pricing rendering | **Pass** | Smoke matrix verifies one H1, loaded images, no console/page errors, and no horizontal overflow. |
| Features, Pricing, and Back-to-home navigation | **Pass** | Automated in Chromium, Firefox, and WebKit. |
| Mobile-menu open/close | **Pass** | Toggle, link selection, outside pointer interaction, and Escape all verified in all three engines. |
| Focus restoration after Escape | **Pass** | Menu button regains focus in all three engines. |
| Reduced motion | **Pass** | With `reducedMotion: "reduce"`, all three engines report auto scrolling, no reveal animation, no link/card transitions, and no card hover transform. |
| Lint | **Pass** | `npm run lint` completed without findings. |
| Production build and type check | **Pass** | `npm run build` completed with Next.js 16.2.12 and statically generated `/` and `/pricing`. |
| Targeted smoke suite | **Pass** | `npm run test:smoke`: 42/42 tests passed. |
| In-app production spot-check | **Pass** | `/pricing` had the expected title/copy/color/current link, no broken images, no horizontal overflow, and no console errors. |

## Browser and viewport coverage

Playwright 1.62.1 exercised Chromium 151.0.7922.34, Firefox 153.0, and WebKit
26.5 at 320 × 720, 375 × 812, 768 × 1024, and 1440 × 900. Route safety checks
ran at every engine/width combination. Navigation, mobile-menu, focus, and
reduced-motion behaviors also passed in every engine where applicable.

These engines are practical proxies for current desktop Chrome/Edge, Firefox,
Safari, Android Chrome, and iOS Safari. No physical iOS or Android device and no
vendor-branded desktop Edge or Safari build was available locally. Those exact
vendor/device combinations are therefore **Uncertain**, not claimed as passed.

## Remaining risks and follow-up findings

- **Uncertain:** Vendor-specific behavior outside the Chromium/Firefox/WebKit
  proxies remains unverified, especially physical iOS Safari and Android Chrome
  input/viewport behavior.
- Playwright browser binaries must be installed once in a fresh environment
  before `npm run test:smoke` can run.
- Dependency installation reported four pre-existing high-severity audit
  findings. They were not investigated or changed because dependency/security
  cleanup is outside this sprint; Web - HQ may route a separate review if
  desired.

No unexpected product issue was found that warrants expanding this sprint.
