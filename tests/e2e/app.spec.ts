import { expect, test } from '@playwright/test';
import { PDFDocument, StandardFonts } from 'pdf-lib';

async function makePdf(name: string, text: string) {
  const pdf = await PDFDocument.create();
  const page = pdf.addPage([300, 200]);
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  page.drawText(text, { x: 24, y: 120, size: 20, font });
  return {
    name,
    mimeType: 'application/pdf',
    buffer: Buffer.from(await pdf.save())
  };
}

test('landing page links to the workspace', async ({ page }) => {
  await page.goto('/');
  await expect(
    page.getByRole('heading', { name: 'Fast PDF cleanup without sending files anywhere.' })
  ).toBeVisible();
  await page.getByRole('link', { name: 'Launch Workspace' }).click();
  await expect(page).toHaveURL(/app\.html/);
});

test('merge export downloads a file', async ({ page }) => {
  await page.goto('/app.html');
  const fileA = await makePdf('alpha.pdf', 'Alpha');
  const fileB = await makePdf('beta.pdf', 'Beta');
  await page.setInputFiles('input[type="file"]', [fileA, fileB]);
  await expect(page.getByText('Pages ready to export')).toBeVisible();
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.getByRole('button', { name: '4. Download result' }).click()
  ]);
  expect(download.suggestedFilename()).toMatch(/\.pdf$/);
});
