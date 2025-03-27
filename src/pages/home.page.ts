import type { Page } from '@playwright/test';
import { HelperClass } from '../../helper/helper';

export class HomePageClass {
   readonly page: Page
   helperpage : HelperClass
   constructor(page: Page) {
      this.page = page
      this.helperpage = new HelperClass(this.page);
   }

   public acceptAllButton = '[data-testid="uc-accept-all-button"]'
   public perfumTab = '[aria-label="PARFUM"]'

   async acceptCookiesConsent() {
      await this.helperpage.click(this.acceptAllButton)
   }

   async clickOnParfumTab() {
      await this.helperpage.click(this.perfumTab)
   }
}
