import { expect, test } from "@playwright/test";

test("the empty app loads without credentials", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle("AI Web App");
  await expect(
    page.getByRole("heading", { name: "Ready to build." }),
  ).toBeVisible();
});

test("the health route is reachable", async ({ request }) => {
  const response = await request.get("/api/health");

  expect(response.ok()).toBe(true);
  expect(await response.json()).toEqual({ status: "ok" });
});
