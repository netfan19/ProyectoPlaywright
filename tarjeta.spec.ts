import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demo.guru99.com/payment-gateway/index.php');
  await page.getByRole('heading', { name: 'Price: $' }).click();
  await page.getByRole('combobox').selectOption('3');
  await page.getByRole('button', { name: 'Buy Now' }).click();
  await page.getByRole('textbox', { name: 'Enter Your Card Number' }).click();
  await page.getByRole('textbox', { name: 'Enter Your Card Number' }).fill('42423423423423');
  await page.locator('#month').selectOption('10');
  await page.locator('#year').selectOption('2027');
  await page.getByRole('textbox', { name: 'CVV Code' }).click();
  await page.getByRole('textbox', { name: 'CVV Code' }).fill('342');
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Pay $' }).click();
});