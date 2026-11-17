import { expect, test, type Page } from "@playwright/test";

const viewports = [
  { width: 320, height: 720 },
  { width: 375, height: 812 },
  { width: 768, height: 1024 },
  { width: 1440, height: 900 },
] as const;

async function expectHealthyPage(page: Page) {
  for (const image of await page.getByRole("img").all()) {
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
  test.describe(`${viewport.width}px viewport`, () => {
    test.use({ viewport });

    test("the coming-soon page renders without broken images or overflow", async ({
      page,
    }) => {
      const errors: string[] = [];
      page.on("console", (message) => {
        if (message.type() === "error") errors.push(message.text());
      });
      page.on("pageerror", (error) => errors.push(error.message));

      await page.goto("/");
      const main = page.getByRole("main");
      await expect(main).toHaveText("Coming Soon");
      await expect(
        main.getByRole("heading", { name: "Coming Soon", level: 1 }),
      ).toBeVisible();
      await expect(main.getByRole("img")).toBeVisible();
      await expect(page.locator("header").getByRole("link")).toHaveCount(0);
      await expect(page.locator("header").getByRole("button")).toHaveCount(0);
      await expect(page.getByRole("contentinfo")).toHaveText(
        /^Copyright © \d{4} Headwaters$/,
      );

      await expectHealthyPage(page);
      expect(errors).toEqual([]);
    });
  });
}

test("the retired pricing route returns 404", async ({ request }) => {
  const response = await request.get("/pricing");
  expect(response.status()).toBe(404);
});
