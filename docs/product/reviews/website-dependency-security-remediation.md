# Website production dependency security remediation

Review date: 2026-08-04\
Owner: Web - HQ task\
Sprint outcome: **Achieved**\
Recommendation to Web - HQ: **Ship**, subject to Web - HQ's final decision.

## Scope and starting state

This sprint addressed only the production findings in the Next.js dependency
chain. The accepted release-readiness implementation, tests, documentation,
favicon work, product behavior, and visual scope were preserved.

The starting dependency tree was:

| Dependency path | Starting version |
| --- | --- |
| Direct `next` dependency | `16.2.12` |
| `next > postcss` | `8.4.31` |
| `next > sharp` | `0.34.5` |
| `@tailwindcss/postcss > postcss` (separate, unaffected path) | `8.5.23` |

`npm audit --omit=dev` reported 3 high-severity production package groups:
`next`, its bundled `postcss`, and `sharp`. npm described `next` as affected
through the two transitive packages and offered exact `next@16.3.0` as a
non-major fix.

## Advisories and paths investigated

| Package and affected path | Advisory | Affected range at review |
| --- | --- | --- |
| `next@16.2.12 > postcss@8.4.31` | [GHSA-qx2v-qp2m-jg93](https://github.com/advisories/GHSA-qx2v-qp2m-jg93), unescaped `</style>` in CSS stringify output | `<8.5.10` |
| `next@16.2.12 > postcss@8.4.31` | [GHSA-6g55-p6wh-862q](https://github.com/advisories/GHSA-6g55-p6wh-862q), attacker-controlled source map file read | `<=8.5.11` |
| `next@16.2.12 > postcss@8.4.31` | [GHSA-r28c-9q8g-f849](https://github.com/advisories/GHSA-r28c-9q8g-f849), source-map path traversal and disclosure | `<=8.5.17` |
| `next@16.2.12 > postcss@8.4.31` | [GHSA-fxqj-rqcc-2cmp](https://github.com/advisories/GHSA-fxqj-rqcc-2cmp), incomplete source-map file-read fix | `<=8.5.22` |
| `next@16.2.12 > sharp@0.34.5` | [GHSA-f88m-g3jw-g9cj](https://github.com/advisories/GHSA-f88m-g3jw-g9cj), inherited libvips vulnerabilities | `<0.35.0` |

The npm audit range grouped `next` versions from
`9.3.4-canary.0` through `16.3.0-preview.10` as affected through these
dependencies. Published `next@16.3.0` metadata was checked before installation:
it requires `postcss@8.5.23`, optionally requires `sharp@^0.35.3`, supports the
installed React 19 line, and requires Node `>=20.9.0`.

## Next.js documentation consulted

The following installed documentation under `node_modules/next/dist/docs/` was
reviewed before changing dependencies:

- `01-app/01-getting-started/18-upgrading.md`
- `01-app/02-guides/upgrading/index.md`
- `01-app/02-guides/upgrading/codemods.md` (exact-version upgrade guidance)
- `01-app/03-api-reference/06-cli/next.md` (`next upgrade` options)

The guidance permits a specific target revision. No migration, codemod, removed
API, or deprecation action was identified for this bounded 16.2.12 to 16.3.0
minor upgrade.

## Dependency change

The only direct dependency change was:

```text
next: 16.2.12 -> 16.3.0
```

It was installed as an exact version with
`npm install next@16.3.0 --save-exact`. React, React DOM,
`eslint-config-next`, Playwright, and all unrelated dependencies were left at
their existing requested versions. No force fix, major upgrade, codemod, or
application-source change was made.

The synchronized lockfile resolves the relevant final production tree as:

| Dependency path | Final version |
| --- | --- |
| Direct `next` dependency | `16.3.0` |
| `next > postcss` (deduped with the existing top-level resolution) | `8.5.23` |
| `next > sharp` | `0.35.3` |
| `@next/env` and platform SWC packages required by Next.js | `16.3.0` |

Sharp's required optional platform/libvips package matrix changed with its
0.35.3 resolution; those lockfile entries are transitive consequences of the
single direct Next.js upgrade.

## Verification

| Check | Result |
| --- | --- |
| Final `npm audit --omit=dev` | **Pass:** 0 production vulnerabilities (0 high, 0 critical, 0 total) |
| Final `npm ls next postcss sharp` | **Pass:** `next@16.3.0`, `postcss@8.5.23`, `sharp@0.35.3`; tree valid and PostCSS deduped |
| `npm run lint` | **Pass:** ESLint completed without findings |
| `npm run build` | **Pass:** Next.js 16.3.0 compiled, type-checked, and statically generated `/`, `/pricing`, `/icon.png`, and the not-found route |
| `npm run test:smoke` | **Pass:** 42/42 checks passed in Chromium, Firefox, and WebKit |

The first smoke invocation could not bind `127.0.0.1:3107` under the restricted
sandbox (`EPERM`) and ran no tests. The unchanged command passed after local
server permission was granted; this was an execution-environment restriction,
not a website failure.

The smoke matrix reconfirmed route health, content/image loading, absence of
console and page errors, horizontal-overflow safety, desktop and mobile
navigation, menu closure and focus restoration, current-page accessibility
state, and reduced-motion behavior. No product, content, layout, navigation,
accessibility, or visual behavior changed or regressed.

## Remaining findings and uncertainty

- The required production audit is clean; none of the reported production
  findings remain.
- A separate full audit (including development dependencies) reports one
  high-severity `brace-expansion` package group on ESLint/typescript-eslint
  tooling paths. It is absent from `npm audit --omit=dev`, is unrelated to the
  reported production Next.js chain, and was intentionally not changed under
  this sprint boundary.
- Physical iOS/Android and vendor-browser verification remains the previously
  accepted release-readiness uncertainty. This dependency change exposed no
  browser-specific regression that would expand the sprint to physical-device
  testing.
- `eslint-config-next` remains at `16.2.12`; it was not necessary for the
  production remediation, and lint passed against Next.js 16.3.0.

## Files changed by this sprint

- `package.json`
- `package-lock.json`
- `docs/product/reviews/website-dependency-security-remediation.md`

Other pre-existing uncommitted release-readiness and favicon changes remain in
the working tree and were not overwritten, reverted, or otherwise changed by
this sprint.

## Recommendation

**Ship** is the evidence-based recommendation for Web - HQ consideration: the
bounded production findings are removed with one exact direct dependency
upgrade, required automated verification passes, and accepted behavior is
unchanged. This is a recommendation only; Web - HQ retains and must make the
final ship decision.
