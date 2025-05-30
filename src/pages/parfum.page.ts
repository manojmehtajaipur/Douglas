import type { Page } from '@playwright/test';
import { HelperClass } from '../../helper/helper';

export class ParfumPageClass {
   readonly page: Page
   helperpage : HelperClass
   testlogs 

   constructor(page: Page, testlogs) {
      this.page = page
      this.helperpage = new HelperClass(this.page);
      this.testlogs = testlogs
   }

   public perfumTab = '[aria-label="PARFUM"]'
   public aktionenFilter = '[data-testid="flags"]'
   public filter(filterName) { return '//div[@class="rc-scrollbars-view"]//div[contains(text(),"' + filterName + '")]' }
   public filterContainer = '//button[@class="selected-facets__value"]'

   async selectAktionenFilter(filter) {
      await this.helperpage.wait(this.aktionenFilter)
      await this.helperpage.click(this.aktionenFilter)
      await this.helperpage.click(this.filter(filter))
      await this.testlogs.write(`Select filter : ${filter} \n`);
   }
}
