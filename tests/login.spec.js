const { test, expect } = require('@playwright/test');

test.describe('Login Page Test Scenarios', () => {

  // Test case 1: Correct Email and Correct Password
  test('Correct email and password should login successfully', async ({ page }) => {

    await page.goto('https://staging1.statstream.dev/authui/login');

    await page.getByLabel('Email').fill('ketan.lokhande@statocean.co');
    await page.getByLabel('Password').fill('Ketan@1234');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await expect(page).toHaveURL(/ui/);
    await expect(page).toHaveTitle('My Workspaces');

    await page.screenshot({path: `ss1.png`});

  });

  // Test case 2: Correct Email and Incorrect Password
  test('Correct email and incorrect password should show error', async ({ page }) => {

    await page.goto('https://staging1.statstream.dev/authui/login');

    await page.getByLabel('Email').fill('ketan.lokhande@statocean.co');
    await page.getByLabel('Password').fill('Ketan@123');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await expect(page.locator('text=Wrong email or password. Please try again.')).toBeVisible();

    await page.screenshot({path: `ss2.png`});

  });

  // Test case 3: Incorrect Email and Correct Password
  test('Incorrect email and correct password should show error', async ({ page }) => {

    await page.goto('https://staging1.statstream.dev/authui/login');

    await page.getByLabel('Email').fill('abc@gmail.com');
    await page.getByLabel('Password').fill('Ketan@1234');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await expect(page.locator('text=Wrong email or password. Please try again.')).toBeVisible();

    await page.screenshot({path: `ss3.png`});

  });

  // Test case 4: Incorrect Email and Incorrect Password
  test('Incorrect email and incorrect password should show error', async ({ page }) => {

    await page.goto('https://staging1.statstream.dev/authui/login');

    await page.getByLabel('Email').fill('abc@gmail.com');
    await page.getByLabel('Password').fill('abc123');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await expect(page.locator('text=Wrong email or password. Please try again.')).toBeVisible();

    await page.screenshot({path: `ss4.png`});

  });

  // Test case 5: Empty Email and Password
  test('Empty email and password should show validation error', async ({ page }) => {

    await page.goto('https://staging1.statstream.dev/authui/login');

    const email = page.locator('input[name="email"]');

    await page.getByRole('button', { name: 'Sign in' }).click();
    await expect(email).toBeVisible();
    const validationMessage = await email.evaluate(input => input.validationMessage);
    expect(validationMessage).toBe('Please fill out this field.');

    await page.screenshot({path: `ss5.png`});

  });

  // Test case 6: Empty Email and Correct Password
  test('Empty email with correct password should show validation error', async ({ page }) => {

    await page.goto('https://staging1.statstream.dev/authui/login');
    
    const email = page.locator('input[name="email"]');

    await page.getByLabel('Password').fill('Ketan@1234');
    await page.getByRole('button', { name: 'Sign in' }).click();

    // await expect(email).toBeVisible();
    const validationMessage = await email.evaluate(input => input.validationMessage);
    expect(validationMessage).toBe('Please fill out this field.');

    await page.screenshot({path: `ss6.png`});

  });

  // Test case 7: Correct Email and Empty Password
  test('Correct email with empty password should show validation error', async ({ page }) => {

    await page.goto('https://staging1.statstream.dev/authui/login');

    await page.getByLabel('Email').fill('ketan.lokhande@statocean.co');
    const password = page.locator('input[name="password"]');
    await page.getByRole('button', { name: 'Sign in' }).click();
    // await expect(password).toBeVisible();
    const validationMessage = await password.evaluate(input => input.validationMessage);
    expect(validationMessage).toBe('Please fill out this field.');

    await page.screenshot({path: `ss7.png`});

  });

});
