# Web — Now

Last updated: 2026-08-04
Owner: Web - HQ task

## Purpose

This is the compact, durable companion to the pinned **Web - HQ** task. Use that task to review acceptance findings, prioritize the backlog, define sprint outcomes and boundaries, decide what comes next, and resolve questions that affect multiple features.

Update this file after any decision that changes the active sprint, priorities, scope, acceptance criteria, or cross-feature direction. Keep it brief and link to detailed implementation notes when they exist.

## Current outcome

**Released successfully; one bounded brand-continuity update is selected.**

Commit `8bcdd0cee634cd28b48770f1bfaeb1c0921fc35e` (`Harden website release readiness`) is deployed through the existing Vercel Git integration at [headwaters.photo](https://headwaters.photo). The home and Pricing routes return HTTP 200 and the production smoke check passed.

The product/accessibility work in the [release-readiness handoff](./reviews/website-release-readiness-baseline.md) and the [production dependency remediation](./reviews/website-dependency-security-remediation.md) are accepted. The known product gaps are closed, all 42 smoke checks pass across Chromium, Firefox, and WebKit, lint and the production build pass, and the production audit reports zero vulnerabilities.

Physical-device coverage remains an accepted uncertainty. One high-severity `brace-expansion` group remains in development-only ESLint/typescript-eslint paths; it is absent from the production audit and is accepted as non-blocking maintenance risk, not runtime release risk.

## Sprint boundary

- In scope:
  - Adopt the evaluated website masthead background at exactly `#E8F3FF`.
  - Use `#163A52` for header navigation and the “In development” pill, with white pill text.
  - Use the existing `#1776D7` brand blue for header focus outlines so non-text contrast remains above 3:1.
  - Keep the mobile menu white and preserve all current dimensions, content, structure, and behavior.
  - Re-run lint, build, and the 42-check smoke suite before release.
- Out of scope:
  - App color changes, website theming, redesign, new content, new navigation, or feature work.
  - Any change outside the shared header and its necessary focus styling.
- Done when:
  - The approved prototype is reproduced without visual or behavioral drift.
  - Required checks pass and the update is deployed and production-smoke-tested.

## Next decisions

1. Ask the existing header-color prototype task to promote the approved treatment through the normal commit, push, and release workflow.
2. Review its production handoff in Web - HQ.
3. Return the website to maintenance mode and focus product work on the app.

## Active backlog

| Priority | Item | Why now | Status |
| --- | --- | --- | --- |
| P0 | Adopt website header brand tint | Improves app/website continuity while preserving clear product differentiation | Selected |
| P0 | Website release-readiness changeset | Product baseline and production dependency remediation are accepted | Released |
| P2 | Development-tooling `brace-expansion` remediation | Full audit has one high-severity DoS group, but production audit is clean | Non-blocking maintenance |
| P2 | Align `eslint-config-next` with the Next.js line | Lint passes, but the config remains on 16.2.12 after the production-only upgrade | Future dependency maintenance |
| P2 | Physical iOS/Android and vendor-browser verification | Engine proxies passed; exact devices remain unverified | Accepted residual risk |

## Cross-feature questions

- None open. The browser/accessibility policy is recorded in [Website support policy](./website-support-policy.md).

## Decision log

| Date | Decision | Rationale |
| --- | --- | --- |
| 2026-08-08 | Adopt the evaluated website header treatment using exact `#E8F3FF`, `#163A52`, and the accessible `#1776D7` focus treatment. | The prototype improves brand continuity with the app while remaining visibly lighter and editorial; desktop, mobile, open-menu, contrast, layout, and all 42 smoke checks passed without suggesting a color adjustment. |
| 2026-08-04 | Put the website into maintenance mode and direct near-term product effort to the app. | The current website is healthy and appropriate for the product's present stage; additional website scope would be speculative until app progress supplies concrete content, conversion, pricing, or launch requirements. |
| 2026-08-04 | Record the website release as successfully deployed at commit `8bcdd0cee634cd28b48770f1bfaeb1c0921fc35e`. | Vercel deployed the synchronized `main` branch; both production routes returned HTTP 200 and the production interaction, image, overflow, accessibility, and console checks passed. |
| 2026-08-04 | **Ship** the accepted website release-readiness changes after the normal commit/release workflow. | The product baseline passes, 42/42 cross-engine smoke checks pass, lint and build pass, and the production audit is clean after the bounded Next.js 16.3.0 upgrade. The remaining dev-only audit group and physical-device uncertainty do not affect the shipped runtime and are explicitly accepted as non-blocking risks. |
| 2026-08-04 | Accept the release-readiness baseline but choose **Iterate**, deferring ship for one bounded production dependency-security remediation. | Product checks pass, but owner review confirmed three high-severity production dependency findings with a non-major Next.js remediation path; carrying them into a release is unnecessary risk. |
| 2026-08-04 | Select a bounded website release-readiness baseline sprint and adopt WCAG 2.2 AA for the current marketing shell. | The acceptance review found a coherent core experience with 7 passes, one bounded contrast failure, and two release-confidence uncertainties; iteration is justified, but redesign or feature expansion is not. |
| 2026-08-04 | Use the pinned, long-lived **Web - HQ** task for website-level product coordination, with this file as the durable summary. | Keeps prioritization and scope discussion centralized without making conversation history the only repository of decisions. |
