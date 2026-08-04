import { expect, test, type Page } from "@playwright/test";

const viewports = [
  { name: "320", width: 320, height: 720 },
  { name: "375", width: 375, height: 812 },
  { name: "768", width: 768, height: 1024 },
  { name: "1440", width: 1440, height: 900 },
] as const;

async function expectHealthyPage(page: Page) {
  const images = page.locator("img");
  const imageCount = await images.count();

  for (let index = 0; index < imageCount; index += 1) {
    const image = images.nth(index);
    await image.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        image.evaluate(
          (element) =>
            element instanceof HTMLImageElement &&
            element.complete &&
            element.naturalWidth > 0,
        ),
      )
      .toBe(true);
  }

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth,
  );
  expect(hasHorizontalOverflow).toBe(false);
}

for (const viewport of viewports) {
  test.describe(`${viewport.name}px viewport`, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    for (const route of ["/", "/pricing"] as const) {
      test(`${route} renders without console errors, broken images, or overflow`, async ({
        page,
      }) => {
        const errors: string[] = [];
        page.on("console", (message) => {
          if (message.type() === "error") errors.push(message.text());
        });
        page.on("pageerror", (error) => errors.push(error.message));

        await page.goto(route);
        await expect(page.locator("h1")).toHaveCount(1);
        await expectHealthyPage(page);
        expect(errors).toEqual([]);
      });
    }
  });
}

test.describe("desktop navigation", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("Features anchor, Pricing, and Back to home navigation work", async ({
    page,
  }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Features" }).click();
    await expect(page).toHaveURL(/\/#features$/);
    await expect(page.locator("#features")).toBeInViewport();

    await page.getByRole("link", { name: "Pricing" }).click();
    await expect(page).toHaveURL(/\/pricing$/);
    await expect(page.getByRole("link", { name: "Pricing" })).toHaveAttribute(
      "aria-current",
      "page",
    );

    await page.getByRole("link", { name: "Back to home" }).click();
    await expect(page).toHaveURL(/\/$/);
  });
});

test.describe("mobile navigation", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("opens, toggles closed, and closes after link selection", async ({
    page,
  }) => {
    await page.goto("/");
    const button = page.getByRole("button", { name: "Open navigation menu" });

    await button.click();
    await expect(page.getByRole("navigation", { name: "Mobile primary navigation" })).toBeVisible();
    await page.getByRole("button", { name: "Close navigation menu" }).click();
    await expect(page.locator("#mobile-navigation")).toBeHidden();

    await button.click();
    await page.getByRole("link", { name: "Features" }).click();
    await expect(page).toHaveURL(/\/#features$/);
    await expect(page.locator("#mobile-navigation")).toBeHidden();

    await button.click();
    await page.getByRole("link", { name: "Pricing" }).click();
    await expect(page).toHaveURL(/\/pricing$/);
    await expect(page.locator("#mobile-navigation")).toBeHidden();
  });

  test("closes on outside interaction", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Open navigation menu" }).click();
    await page.locator("main").click({ position: { x: 8, y: 300 } });
    await expect(page.locator("#mobile-navigation")).toBeHidden();
  });

  test("closes on Escape and restores focus", async ({ page }) => {
    await page.goto("/");
    const button = page.getByRole("button", { name: "Open navigation menu" });
    await button.click();
    await page.keyboard.press("Escape");
    await expect(page.locator("#mobile-navigation")).toBeHidden();
    await expect(button).toBeFocused();
  });

  test("exposes Pricing as the current page in the open menu", async ({
    page,
  }) => {
    await page.goto("/pricing");
    await page.getByRole("button", { name: "Open navigation menu" }).click();
    await expect(page.getByRole("link", { name: "Pricing" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });
});

test("reduced motion disables smooth scrolling, reveals, transitions, and hover movement", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  await expect
    .poll(() =>
      page.locator("html").evaluate((element) => getComputedStyle(element).scrollBehavior),
    )
    .toBe("auto");

  const reveal = page.locator(".reveal-on-scroll").first();
  await expect
    .poll(() =>
      reveal.evaluate((element) => {
        const styles = getComputedStyle(element);
        return [styles.animationName, styles.opacity, styles.transform];
      }),
    )
    .toEqual(["none", "1", "none"]);

  const card = page.locator(".feature-card").first();
  await card.hover();
  await expect
    .poll(() =>
      card.evaluate((element) => {
        const styles = getComputedStyle(element);
        return [styles.transitionDuration, styles.transform];
      }),
    )
    .toEqual(["0s", "none"]);
});
