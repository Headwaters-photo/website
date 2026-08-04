# Web — Now

Last updated: 2026-08-04
Owner: Web - HQ task

## Purpose

This is the compact, durable companion to the pinned **Web - HQ** task. Use that task to review acceptance findings, prioritize the backlog, define sprint outcomes and boundaries, decide what comes next, and resolve questions that affect multiple features.

Update this file after any decision that changes the active sprint, priorities, scope, acceptance criteria, or cross-feature direction. Keep it brief and link to detailed implementation notes when they exist.

## Current outcome

**Released successfully.**

Commit `8bcdd0cee634cd28b48770f1bfaeb1c0921fc35e` (`Harden website release readiness`) is deployed through the existing Vercel Git integration at [headwaters.photo](https://headwaters.photo). The home and Pricing routes return HTTP 200 and the production smoke check passed.

The product/accessibility work in the [release-readiness handoff](./reviews/website-release-readiness-baseline.md) and the [production dependency remediation](./reviews/website-dependency-security-remediation.md) are accepted. The known product gaps are closed, all 42 smoke checks pass across Chromium, Firefox, and WebKit, lint and the production build pass, and the production audit reports zero vulnerabilities.

Physical-device coverage remains an accepted uncertainty. One high-severity `brace-expansion` group remains in development-only ESLint/typescript-eslint paths; it is absent from the production audit and is accepted as non-blocking maintenance risk, not runtime release risk.

## Sprint boundary

No implementation sprint is active. The accepted release includes the existing home and Pricing routes, responsive navigation, accessibility fixes, support policy, Playwright smoke coverage, favicon work, and the Next.js 16.3.0 dependency remediation. It does not imply approval for new product scope.

## Next decisions

1. Archive the completed release working task after its handoff is retained here.
2. Select the next bounded product outcome in Web - HQ; do not roll it into the completed release.

## Active backlog

| Priority | Item | Why now | Status |
| --- | --- | --- | --- |
| P0 | Website release-readiness changeset | Product baseline and production dependency remediation are accepted | Released |
| P2 | Development-tooling `brace-expansion` remediation | Full audit has one high-severity DoS group, but production audit is clean | Non-blocking maintenance |
| P2 | Align `eslint-config-next` with the Next.js line | Lint passes, but the config remains on 16.2.12 after the production-only upgrade | Future dependency maintenance |
| P2 | Physical iOS/Android and vendor-browser verification | Engine proxies passed; exact devices remain unverified | Accepted residual risk |

## Cross-feature questions

- None open. The browser/accessibility policy is recorded in [Website support policy](./website-support-policy.md).

## Decision log

| Date | Decision | Rationale |
| --- | --- | --- |
| 2026-08-04 | Record the website release as successfully deployed at commit `8bcdd0cee634cd28b48770f1bfaeb1c0921fc35e`. | Vercel deployed the synchronized `main` branch; both production routes returned HTTP 200 and the production interaction, image, overflow, accessibility, and console checks passed. |
| 2026-08-04 | **Ship** the accepted website release-readiness changes after the normal commit/release workflow. | The product baseline passes, 42/42 cross-engine smoke checks pass, lint and build pass, and the production audit is clean after the bounded Next.js 16.3.0 upgrade. The remaining dev-only audit group and physical-device uncertainty do not affect the shipped runtime and are explicitly accepted as non-blocking risks. |
| 2026-08-04 | Accept the release-readiness baseline but choose **Iterate**, deferring ship for one bounded production dependency-security remediation. | Product checks pass, but owner review confirmed three high-severity production dependency findings with a non-major Next.js remediation path; carrying them into a release is unnecessary risk. |
| 2026-08-04 | Select a bounded website release-readiness baseline sprint and adopt WCAG 2.2 AA for the current marketing shell. | The acceptance review found a coherent core experience with 7 passes, one bounded contrast failure, and two release-confidence uncertainties; iteration is justified, but redesign or feature expansion is not. |
| 2026-08-04 | Use the pinned, long-lived **Web - HQ** task for website-level product coordination, with this file as the durable summary. | Keeps prioritization and scope discussion centralized without making conversation history the only repository of decisions. |
