import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demo.guru99.com/telecom/index.html');
  await page.getByRole('link', { name: 'Add Customer' }).click();
  await page.getByText('Done').click();
  await page.getByPlaceholder('FirstName').fill('Michel');
  await page.getByPlaceholder('LastName').fill('Robles');
  await page.getByPlaceholder('Email').fill('mrobles@mail.com');
  await page.getByPlaceholder('Enter your address' ).fill('av republica dominicana 123 Jesus Maria');
  await page.getByPlaceholder('Mobile Number').fill('912345678');
  await page.getByRole('button',{ name: 'Submit' }).click();

 // await page.getByRole('heading', { name: '403193' }).click();
// copiar y mostrar en consola el codigo
  const customerID = await page.getByRole('heading', { level: 3 }).textContent();
  console.log('El ID generado es:', customerID);

  await page.locator('#main').getByRole('link', { name: 'Home' }).click();
});