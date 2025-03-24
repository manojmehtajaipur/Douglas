//helper.ts

import type { expect, Page } from '@playwright/test';

export class HelperClass {
   readonly page: Page
   constructor(page: Page) {
      this.page = page
   }

   async navigate(url) {
      await this.page.goto(url);
   }

   async click(element) {
      await this.page.click(element)
   }

   async wait(element) {
      await this.page.waitForSelector(element)
   }
}