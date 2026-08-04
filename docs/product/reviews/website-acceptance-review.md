# Website acceptance review

Review date: 2026-08-04\
Reviewer: Codex working task, governed by **Web - HQ**\
Implementation reviewed: working tree at `9730cbc` plus the pre-existing uncommitted favicon and product-coordination-doc changes\
Recommendation: **Iterate**

## Review scope and basis

This review covers the current two-route Headwaters marketing experience at `/` and `/pricing`. It is a state assessment, not an implementation sprint; no website code was changed.

The repository does not contain a standalone product requirements or browser-support specification. Intended behavior was therefore established, in descending order of confidence, from:

1. `docs/product/NOW.md`, which defines this acceptance review as the input to the next Web - HQ prioritization decision.
2. The implementation in `app/page.tsx`, `app/pricing/page.tsx`, `app/components/site-header.tsx`, `app/components/site-footer.tsx`, `app/layout.tsx`, and `app/globals.css`.
3. Commit `9730cbc` ("Fix mobile header navigation"), whose message explicitly requires the mobile menu to close on navigation, outside pointer interaction, and Escape, restore focus after Escape, and remain constrained to the viewport.
4. Commit `af710c2` ("Polish Headwaters landing page and add pricing route"), which describes the intended editorial hero, responsive photograph, feature cards, local typography, shared navigation/status/footer, and pricing page.
5. A reviewer-applied accessibility baseline of WCAG 2.2 Level AA for normal text contrast. This baseline is not stated in the repository and should be confirmed by Web - HQ.

Where the repository does not establish an expectation confidently, the result is marked **Uncertain** rather than inferred.

## 1. Acceptance criteria

| ID | Criterion | Expected-behavior source | Confidence |
| --- | --- | --- | --- |
| AC-01 | The home page presents the Headwaters identity, editorial proposition, representative photograph and story, and all three feature themes. | `app/page.tsx`; commit `af710c2` | High |
| AC-02 | The pricing route clearly communicates that pricing is still in development and provides a path back home. | `app/pricing/page.tsx`; commit `af710c2` | High |
| AC-03 | Shared navigation connects the home page, feature section, pricing page, and footer contact without broken routes or horizontal overflow. | Header/footer implementation and route hrefs | High |
| AC-04 | On mobile, the navigation button exposes state accessibly; the panel fits the viewport; link selection, outside pointer interaction, and Escape close it; Escape returns focus to the button. | `site-header.tsx`; explicit commit `9730cbc` acceptance intent | High |
| AC-05 | Layout adapts coherently from narrow mobile through tablet to desktop: mobile navigation and stacked cards/footer, tablet/desktop navigation, responsive image crops, and no horizontal overflow. | Responsive classes in page/components/CSS; commit `af710c2` | High |
| AC-06 | Each supported page has an English document language, one meaningful H1, route-specific title/description, useful image alternatives, and labeled navigation landmarks. | `app/layout.tsx`, route metadata, component semantics | High |
| AC-07 | Normal-size text meets WCAG 2.2 AA contrast (at least 4.5:1). | Reviewer baseline; not explicitly defined in repository | Medium; baseline needs owner confirmation |
| AC-08 | Users who prefer reduced motion do not receive smooth scrolling, reveal animation, or hover movement. | Explicit `prefers-reduced-motion` rules in `app/globals.css` | Medium; browser emulation was unavailable in this review |
| AC-09 | The production build compiles and type-checks, lint passes, supported routes render without failed images, horizontal overflow, or console warnings/errors in the tested browser. | `package.json` scripts and normal release-quality expectation | High |
| AC-10 | The experience works across every supported browser. | No supported-browser matrix is present | Low; cannot be established confidently |

## 2. What was created

The current product is a restrained, editorial marketing shell for Headwaters.

The home page opens with a shared 75 px header, a large Headwaters wordmark, the proposition “Remember the adventure behind every photograph,” and an edge-to-edge lake photograph. Below the image, a short brand statement introduces the product, followed by three feature cards: remembering place, telling the story, and keeping the adventure. The shared footer repeats the brand, exposes `hello@headwaters.photo`, and displays the current year.

The pricing page is intentionally a placeholder rather than a plan-selection experience. It explains that pricing is still taking shape, repeats the “In development” product status through the shared header, and offers a “Back to home” link. No signup, purchase, account, form, or pricing-plan interaction exists in the current scope.

At 640 px and wider, the header shows horizontal Features and Pricing links plus the status pill. Below 640 px, these controls move into a hamburger-triggered floating panel. The home photograph changes from a tall 4:5 crop on mobile to 3:2 at tablet widths and a wide 11:5 crop on large screens. Feature cards stack on mobile and become three equal-height columns from the 768 px breakpoint. The footer is stacked and centered on mobile, then horizontal at wider sizes. Scroll-linked reveals are used for the photograph/story/cards when supported, with reduced-motion overrides present in CSS.

Representative states: [desktop home](./evidence/home-desktop-1440x900.png), [mobile home](./evidence/home-mobile-375x812.png), [mobile feature section](./evidence/home-mobile-features-375x812.png), [desktop pricing](./evidence/pricing-desktop-1440x900.png), and [mobile pricing](./evidence/pricing-mobile-375x812.png).

## 3. What was tested

### Automated checks

Exact commands:

```sh
npm run lint
npm run build
npm start
node -e 'const lum=h=>{const a=h.match(/../g).map(x=>parseInt(x,16)/255).map(c=>c<=.04045?c/12.92:((c+.055)/1.055)**2.4);return .2126*a[0]+.7152*a[1]+.0722*a[2]}; for(const c of ["198cff","1776d7","475569","64748b"]){const l=lum(c); console.log(c,((1.05)/(l+.05)).toFixed(2))}'
```

- `npm run lint`: passed with no ESLint findings.
- `npm run build`: passed; Next.js 16.2.12 compiled, ran TypeScript, and statically generated `/`, `/pricing`, `/_not-found`, and `/icon.png`.
- `npm start`: the first sandboxed attempt could not bind `0.0.0.0:3000`; the approved retry succeeded. This did not limit the subsequent review.
- Contrast calculation: `#198cff` on white is 3.37:1; `#1776d7` on white is 4.56:1. The other tested body/footer colors exceeded 4.5:1.
- The repository has no unit, integration, or end-to-end test script.

### Browser and visual checks

Browser tested: **Codex In-app Browser** against the optimized production server at `http://localhost:3000`. No second browser engine was tested because the repository does not identify supported browsers and no separate connected browser was part of this task.

| Viewport | Routes | Checks |
| --- | --- | --- |
| 1440 × 900 | `/`, `/pricing` | Desktop header/footer, hero and image crop, three-column feature cards, pricing composition, route titles, images, overflow, feature-anchor navigation, pricing navigation, back-home navigation |
| 768 × 1024 | `/` | Tablet breakpoint, horizontal header, 3:2 image, three equal-height feature cards, footer, overflow |
| 375 × 812 | `/`, `/pricing` | Mobile header/menu, portrait image, stacked features/footer, pricing composition, link navigation, outside close, Escape close/focus return, menu bounds, overflow |
| 320 × 568 | `/`, `/pricing` | Narrow-screen fit, header control spacing, heading/card widths, horizontal overflow |

Interactions verified:

- Features link updates the URL to `/#features` and brings the feature heading/cards into view on desktop and mobile.
- Desktop and mobile Pricing links reach `/pricing`.
- “Back to home” reaches `/`.
- Mobile menu toggles `aria-expanded` and its accessible label between open/close states.
- Mobile menu closes after Features/Pricing selection and outside pointer interaction.
- Escape closes the mobile menu and restores focus to the menu button; focus outlines were visible on the button/menu link.
- Header/footer home links and footer email hrefs were inspected. The `mailto:` link was not launched because doing so would leave the browser and does not add useful website evidence.
- Route-specific metadata, H1 count, document language, image completion/natural width, responsive element geometry, and horizontal overflow were inspected in the live DOM.
- Browser console warnings/errors were checked after fresh home and pricing loads; none were recorded.

Limitations:

- Reduced-motion emulation was not available through the selected browser surface, so the CSS override was inspected but not behaviorally exercised.
- Cross-browser behavior is unverified because no support matrix exists and only the in-app browser was tested.
- The review did not launch an external mail client, test deployment/CDN behavior, or run network/performance profiling.

## 4. Results

| ID | Result | Explanation |
| --- | --- | --- |
| AC-01 | **Pass** | All intended home-page brand, hero, story, image, and feature content rendered with correct hierarchy and completed images. See [desktop home](./evidence/home-desktop-1440x900.png) and [mobile features](./evidence/home-mobile-features-375x812.png). |
| AC-02 | **Pass** | `/pricing` clearly communicates the development state and its back-home interaction works at desktop and mobile sizes. See [desktop](./evidence/pricing-desktop-1440x900.png) and [mobile](./evidence/pricing-mobile-375x812.png). |
| AC-03 | **Pass** | Home, feature-anchor, pricing, back-home, logo-home, and email href paths were present and internal paths behaved correctly. No tested viewport had horizontal overflow. |
| AC-04 | **Pass** | All explicitly documented mobile-menu behaviors passed. At 375 px the panel was 343 px wide with 16 px side margins and a 44 × 44 px button. See [open menu](./evidence/mobile-menu-open-375x812.png). |
| AC-05 | **Pass** | The site adapted at 320, 375, 768, and 1440 px without horizontal overflow; image aspect, card grid, navigation, and footer layouts changed as implemented. |
| AC-06 | **Pass** | Both routes used `lang="en"`, one H1, route-specific titles/descriptions, labeled navigation, and successfully loaded images with useful alternatives. |
| AC-07 | **Fail** | The small `#198cff` Pricing eyebrow is 3.37:1 against white, below the 4.5:1 AA threshold for normal text. See BUG-A11Y-01 and the [pricing evidence](./evidence/pricing-mobile-375x812.png). |
| AC-08 | **Uncertain** | The reduced-motion override is present and appears complete in CSS, but the preference could not be emulated in the tested browser. Static inspection alone is not behavioral acceptance. |
| AC-09 | **Pass** | Lint and production build passed; tested routes showed no failed images, overflow, or console warnings/errors. |
| AC-10 | **Uncertain** | Only the Codex In-app Browser was exercised and the repository does not state which browsers must be supported. |

Totals: **7 Pass, 1 Fail, 2 Uncertain**.

## 5. Bugs and usability gaps

### Functional defects

No functional defects were reproduced in the supported routes and interactions tested.

### Usability and accessibility concerns

#### BUG-A11Y-01 — Pricing eyebrow text fails normal-text contrast

- Severity: **Low**
- Type: Accessibility
- User impact: Users with low vision may have difficulty reading the small section label. The main heading repeats its meaning, which limits task impact but does not remove the contrast failure.
- Affected route/viewports: `/pricing`; all tested sizes. The label is 12 px on mobile and 14 px from the small breakpoint.
- Reproduction:
  1. Open `/pricing`.
  2. Inspect the uppercase “Pricing” eyebrow.
  3. Compare foreground `#198cff` with white: 3.37:1, below 4.5:1 for normal text.
- Evidence: [desktop pricing](./evidence/pricing-desktop-1440x900.png) and [mobile pricing](./evidence/pricing-mobile-375x812.png).

#### UX-01 — Pricing paragraph lacks terminal punctuation

- Severity: **Low**
- Type: Content polish
- User impact: The unfinished sentence slightly reduces perceived editorial quality on the only secondary page.
- Affected route/viewports: `/pricing`; all sizes.
- Reproduction:
  1. Open `/pricing`.
  2. Read the body copy ending “as the experience comes to life”.
  3. Observe that the sentence has no period.
- Evidence: [desktop pricing](./evidence/pricing-desktop-1440x900.png) and [mobile pricing](./evidence/pricing-mobile-375x812.png).

#### UX-A11Y-02 — Current navigation location is not exposed

- Severity: **Low**
- Type: Accessibility/orientation
- User impact: Screen-reader users receive a Pricing link on `/pricing` but no `aria-current` state, making current-page orientation less explicit.
- Affected route/viewports: `/pricing`; desktop navigation and the opened mobile menu.
- Reproduction:
  1. Open `/pricing`.
  2. Inspect the header Pricing link in the accessibility tree/DOM.
  3. Observe that `aria-current` is absent.
- Evidence: The visual context is shown in [desktop pricing](./evidence/pricing-desktop-1440x900.png) and [open mobile menu](./evidence/mobile-menu-open-375x812.png); the live DOM check returned `aria-current: null`.

## 6. Evidence

Evidence is stored in `docs/product/reviews/evidence/`.

| Evidence | Demonstrates | Related result/finding |
| --- | --- | --- |
| [home-desktop-1440x900.png](./evidence/home-desktop-1440x900.png) | Complete desktop home experience, image crop, feature cards, and footer | AC-01, AC-03, AC-05 |
| [home-mobile-375x812.png](./evidence/home-mobile-375x812.png) | Mobile header, hero typography, and portrait image crop | AC-01, AC-05 |
| [home-mobile-features-375x812.png](./evidence/home-mobile-features-375x812.png) | In-page feature navigation and stacked/revealed cards | AC-01, AC-03, AC-05 |
| [mobile-menu-open-375x812.png](./evidence/mobile-menu-open-375x812.png) | Constrained open menu, visible close-button focus, links, and status | AC-04, UX-A11Y-02 |
| [pricing-desktop-1440x900.png](./evidence/pricing-desktop-1440x900.png) | Desktop placeholder route and shared shell | AC-02, BUG-A11Y-01, UX-01, UX-A11Y-02 |
| [pricing-mobile-375x812.png](./evidence/pricing-mobile-375x812.png) | Mobile pricing composition and stacked footer | AC-02, AC-05, BUG-A11Y-01, UX-01 |

## 7. Recommendation

**Iterate.**

The current two-page experience is coherent and its core navigation, responsive behavior, semantics, metadata, images, build, and mobile-menu acceptance behaviors all passed. No functional defect was found. However, one AA contrast criterion fails, and release confidence is incomplete because supported browsers are undefined and reduced-motion behavior was not exercised. These are bounded hardening issues, not reasons to reconsider the product direction.

Shipping unchanged would accept an avoidable accessibility failure and an undefined compatibility bar. A short release-readiness iteration should close those gaps before Web - HQ makes a ship decision.

## 8. Candidate next sprint

### Candidate outcome

**Establish a verifiable release-readiness baseline for the existing two-route marketing shell.**

Intended result: Web - HQ can make a ship decision against an explicit browser/accessibility matrix, with all findings from this review either fixed or consciously accepted.

Likely scope:

- Decide and record supported browsers and the minimum viewport matrix.
- Correct the Pricing eyebrow contrast and missing punctuation.
- Expose an appropriate current-page state for Pricing navigation.
- Behaviorally verify reduced-motion handling.
- Add the smallest maintainable route/navigation/mobile-menu smoke coverage needed to prevent regression, using the existing stack where practical.
- Re-run lint, production build, the agreed browser matrix, and the targeted accessibility checks.

Explicit exclusions:

- New pages, signup/account flows, forms, backend work, pricing plans, or payments.
- General redesign, typography overhaul, new brand assets, or broad cleanup.
- Marketing analytics, SEO campaign work, deployment migration, or comprehensive performance optimization.
- Feature expansion beyond the current home and pricing routes.

Suggested completion criteria:

1. The supported browser/viewport matrix is approved and documented.
2. BUG-A11Y-01, UX-01, and UX-A11Y-02 are resolved or explicitly accepted by Web - HQ with rationale.
3. Reduced-motion behavior is demonstrated in a browser with motion preference enabled.
4. Home, Features anchor, Pricing, Back to home, and mobile-menu open/close/navigation paths pass in the agreed matrix.
5. Normal-size text meets the agreed contrast standard.
6. `npm run lint` and `npm run build` pass, with no new console errors or horizontal overflow.

This is a candidate only. **Web - HQ** owns prioritization, final sprint boundaries, backlog updates, and any change to `docs/product/NOW.md`.
