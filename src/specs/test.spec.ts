import { test, expect, Page } from '@playwright/test';
import { HomePageClass } from '../pages/home.page'
import { ParfumPageClass } from '../pages/parfum.page'
import { HelperClass } from '../../helper/helper';
import data from '../../fixtures/aktionenfilters.json'
import config from '../../fixtures/userconfig.json'
import classname from '../../fixtures/classname.json'
import file from 'fs'

let homepage, parfumpage, helperpage, logStream;

test.beforeEach(async ({ page }) => {
    homepage = new HomePageClass(page);
    parfumpage = new ParfumPageClass(page, logStream);
    helperpage = new HelperClass(page);
    logStream = file.createWriteStream(`documents/logs${new Date().toJSON().slice(0,10)}.txt`, { flags: 'a' });
});

test.describe('Douglas Home page Test', () => {

    test('Verify aktionen filters are not on Parfum page without selecting', async ({ page }) => {
        await helperpage.navigate(config.url);
        await logStream.write(`Navigate to : ${config.url} \n`);

        await homepage.acceptCookiesConsent();

        await homepage.clickOnParfumTab();
        await expect(page.locator(homepage.perfumTab)).toHaveClass(classname.selectedTab);
        await logStream.write(`User is on Parful page\n`);

        await expect(page.locator(parfumpage.filterContainer)).not.toHaveText([data.filter3, data.filter2, data.filter1])
    });

    test('Verify aktionen filters on Parfum page', async ({ page }) => {
        await helperpage.navigate(config.url);
        await logStream.write(`Navigate to : ${config.url} \n`);

        await homepage.acceptCookiesConsent();

        await homepage.clickOnParfumTab();
        await expect(page.locator(homepage.perfumTab)).toHaveClass(classname.selectedTab);

        await parfumpage.selectAktionenFilter(data.filter1)
        await parfumpage.selectAktionenFilter(data.filter2)
        await parfumpage.selectAktionenFilter(data.filter3)

        await expect(page.locator(parfumpage.filterContainer)).toHaveText([data.filter3, data.filter2, data.filter1])
        await logStream.write(`Verify filters on Parfum page : ${data.filter1}, ${data.filter1}, ${data.filter1}`)

    });

    test('Fail Test: Verify retry and screenshot capture on fail scenario', async ({ page }) => {
        await helperpage.navigate(config.url);
        await logStream.write(`Navigate to : ${config.url} \n`);

        await homepage.acceptCookiesConsent();

        await logStream.write(`Verifying Parfum page without click on Parfum tab \n`)
        await expect(page.locator(homepage.perfumTab)).toHaveClass(classname.selectedTab);
    });

});
