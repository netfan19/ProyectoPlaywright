import { test, expect } from '@playwright/test';


test('ForNovus', async ({ page }) => {
  // Navegar a la página principal
  await page.goto('https://demo.guru99.com/payment-gateway');

// Abrir una nueva ventana y cambiar a ella
const [tarjeta] = await Promise.all([
    page.waitForEvent('popup'),
    page.getByRole('link',{name: 'Generate Card Number'}).click(),
             // Cambia el selector según el botón que abra la nueva ventana
  ]);
  await tarjeta.waitForLoadState(); 
  // Esperar a que la nueva ventana se cargue

  const nroTarjeta =await tarjeta.getByRole('heading', { name: 'Card Number' }).textContent();
  const Tarjetasinespacios = nroTarjeta?.replace(/\D/g, '');
  const nroCVV= await tarjeta.getByRole('heading', { name: 'CVV' }).textContent();
  const CVVsinespacios = nroCVV?.replace(/\D/g, '');

  const nroExpiracion =await tarjeta.getByRole('heading', { name: 'Exp:-' }).textContent();
  const mesExpiracion = nroExpiracion?.split('/')[0].trim();
  const anhoExpiracion = nroExpiracion?.split('/')[1].trim();

  const credLimit= await tarjeta.getByRole('heading', { name: 'Credit Limit' }).textContent();
  const CredLimitSinDecimales = credLimit?.replace(/\d{2}/g, '');
  const CredLimitSinespacios = CredLimitSinDecimales?.replace(/\D/g, ''); 



  console.log('El numero de tarjeta es:', Tarjetasinespacios);
  console.log('El numero de CVV es:', CVVsinespacios);
  console.log('La expiración es:', nroExpiracion);
  console.log('El mes de expiración es:', mesExpiracion);
  console.log('El año de expiración es:', anhoExpiracion);
  console.log('El límite de crédito sin espacios es:', CredLimitSinespacios);

  //quedarme solo con el simbolo de dólar
  console.log('El simbolo de dolar es:', credLimit?.match(/\$/)?.[0]);

    tarjeta.close();
    await page.waitForLoadState();
   
    const precio = await page.getByRole('heading', { name: 'Price: $' }).textContent();
    const precioSinEspacios = precio.replace(/\D/g, '');
    console.log('El precio es:', precioSinEspacios);
    const cantidad="2";
    await page.getByRole('combobox').selectOption(cantidad);

    await page.getByRole('button', { name: 'Buy Now' }).click();

    await page.waitForLoadState();

    await page.getByPlaceholder('Enter Your Card Number').fill(Tarjetasinespacios);

  await page.locator('#month').selectOption(mesExpiracion);
  await page.locator('#year').selectOption({anhoExpiracion);
  await page.getByPlaceholder('CVV Code').fill(CVVsinespacios);

  await page.getByRole('button', { name: 'Pay $' }).click();



await page.pause(2000);
  await tarjeta.close();
});