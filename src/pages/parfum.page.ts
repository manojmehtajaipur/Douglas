//parfum.page.ts

import type { Page } from '@playwright/test';
import { HelperClass } from '../../helper/helper';

export class ParfumPageClass {
   readonly page: Page
   helperpage : HelperClass
   constructor(page: Page) {
      this.page = page
      this.helperpage = new HelperClass(this.page);
   }

   public perfumTab = '[aria-label="PARFUM"]'
   public aktionenFilter = '[data-testid="flags"]'
   public filter(filterName) { return '//div[@class="rc-scrollbars-view"]//div[contains(text(),"' + filterName + '")]' }
   public filterContainer = '//button[@class="selected-facets__value"]'

/**
 * 
 * @param filter is name of the filter
 * Click on filter and
 * Select aktionen filter as per parameter
 */
   async selectAktionenFilter(filter) {
      await this.helperpage.wait(this.aktionenFilter)
      await this.helperpage.click(this.aktionenFilter)
      await this.helperpage.click(this.filter(filter))
   }
}