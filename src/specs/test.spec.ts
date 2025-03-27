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
    page.on('console', msg => {console.log(msg)});
});

test.describe('Douglas Home page Test', () => {

    test('Verify aktionen filters are not on Parfum page without selecting', async ({ page }) => {

        await helperpage.navigate(config.url);

        await homepage.acceptCookiesConsent();

        await homepage.clickOnParfumTab();
        await expect(page.locator(homepage.perfumTab)).toHaveClass(classname.selectedTab);

        await expect(page.locator(parfumpage.filterContainer)).not.toHaveText([data.filter3, data.filter2, data.filter1])
    });

    test('Verify aktionen filters on Parfum page', async ({ page }) => {

        await helperpage.navigate(config.url);

        await homepage.acceptCookiesConsent();

        await homepage.clickOnParfumTab();
        await expect(page.locator(homepage.perfumTab)).toHaveClass(classname.selectedTab);

        console.log('Apply filters' + data.filter1 + data.filter1 + data.filter1)
        await parfumpage.selectAktionenFilter(data.filter1)
        await parfumpage.selectAktionenFilter(data.filter2)
        await parfumpage.selectAktionenFilter(data.filter3)

        await expect(page.locator(parfumpage.filterContainer)).toHaveText([data.filter3, data.filter2, data.filter1])
    });

    test('Fail Test: Verify retry and screenshot capture on fail scenario', async ({ page }) => {

        await helperpage.navigate(config.url);

        await homepage.acceptCookiesConsent();

        await console.error('Verifying Parfum page without click on Parfum tab')
        await expect(page.locator(homepage.perfumTab)).toHaveClass(classname.selectedTab);
    });

});
