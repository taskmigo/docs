import { expect, test } from '@playwright/test';

const documentationRoutes = [
  ['/docs/docs/', 'Taskmigo'],
  ['/docs/docs/architecture/', 'Architecture'],
  ['/docs/docs/resources/', 'Resource model'],
  ['/docs/docs/runtime/', 'Runtime lifecycle'],
  ['/docs/docs/status/', 'Product status'],
  ['/docs/docs/manifests/', 'Manifest overview'],
  ['/docs/docs/manifests/v0-site/', 'v0/site'],
  ['/docs/docs/manifests/v0-translation/', 'v0/translation'],
] as const;

for (const [path, heading] of documentationRoutes) {
  test(`${path} hydrates without browser errors`, async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text());
    });
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('requestfailed', (request) => errors.push(`${request.url()}: ${request.failure()?.errorText}`));

    const response = await page.goto(path, { waitUntil: 'networkidle' });

    expect(response?.status()).toBe(200);
    await expect(page.getByRole('heading', { level: 1, name: heading }).first()).toBeVisible();
    await expect(page.getByRole('heading', { level: 1, name: 'Đã xảy ra lỗi' })).toHaveCount(0);
    expect(errors).toEqual([]);
  });
}
