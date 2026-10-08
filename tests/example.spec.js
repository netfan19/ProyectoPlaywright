import { test, expect } from '@playwright/test';

test('ForNovus', async ({ page }) => {
  await page.goto('https://novustechnology.pe/practice-form/');
  await page.getByRole('heading', { name: 'Formulario Novus Technology' }).innerText();
  await page.getByRole('textbox', { name: 'Nombres y Apellidos' }).fill('Jorge Erickson');
  await page.getByRole('textbox', { name: 'Apellido', exact: true }).fill('Paz Diaz');
  await page.getByRole('checkbox', { name: 'Deportes' }).check();
  await page.getByRole('radio', { name: 'Masculino' }).check();
  await page.getByPlaceholder('Número de Teléfono' ).fill('935404484');
  await page.getByLabel('Correo Electrónico' ).fill('jorgepazdiaz@gmail.com');
  await page.getByLabel('select-department').selectOption('AMAZONAS');
  await page.getByLabel('select-city').selectOption('BAGUA');
  await page.getByLabel('Comandos de Selenium').selectOption('Switch Commands');
  //    await page.getByRole('button', { name: 'Foto' }).setInputFiles('appsmac.txt');
  await page.getByRole('button', { name: 'Enviar' }).click();
  await page.getByRole('cell', { name: 'Jorge Erickson' }).innerText();
  await page.getByRole('cell', { name: 'Paz Diaz' }).innerText();
  await page.getByRole('button', { name: 'Close' }).click();
});
//npm init playwright@latest
// npx playwright test
//npx playwright show-report
//npx playwright test