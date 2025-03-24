//test.spec.ts

import { test, expect, Page } from '@playwright/test';
import { HomePageClass } from '../pages/home.page'
import { ParfumPageClass } from '../pages/parfum.page'
import { HelperClass } from '../../helper/helper';
import data from '../../fixtures/aktionenfilters.json'
import config from '../../fixtures/userconfig.json'
import classname from '../../fixtures/classname.json'

let homepage, parfumpage, helperpage;

test.beforeEach(async ({ page }) => {
    homepage = new HomePageClass(page);
    parfumpage = new ParfumPageClass(page);
    helperpage = new HelperClass(page);
});

test.describe('Douglas Home page Test', () => {

    test('Verify aktionen filters are not on Parfum page without selecting', async ({ page }) => {

        // Navigate to the url
        await helperpage.navigate(config.url);

        // Accept Cookies
        await homepage.acceptCookiesConsent();

        // Click on Parfum tab and verify
        await homepage.clickOnParfumTab();
        await expect(page.locator(homepage.perfumTab)).toHaveClass(classname.selectedTab);

        // Verify aktionen filters are not selected
        await expect(page.locator(parfumpage.filterContainer)).not.toHaveText([data.filter3, data.filter2, data.filter1])
    });

    test('Verify aktionen filters on Parfum page', async ({ page }) => {

        // Navigate to the url
        await helperpage.navigate(config.url);

        // Accept Cookies
        await homepage.acceptCookiesConsent();

        // Click on Parfum tab and verify
        await homepage.clickOnParfumTab();
        await expect(page.locator(homepage.perfumTab)).toHaveClass(classname.selectedTab);

        // Select filters on Parfum page
        await parfumpage.selectAktionenFilter(data.filter1)
        await parfumpage.selectAktionenFilter(data.filter2)
        await parfumpage.selectAktionenFilter(data.filter3)

        // Verify filters are selected on the page
        await expect(page.locator(parfumpage.filterContainer)).toHaveText([data.filter3, data.filter2, data.filter1])
    });

});