/*
 * Copyright (c) 2026, marcelomachado
 * Licensed under The MIT License [see LICENSE for details]
 */

import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';



@Injectable()
export class PuppeteerService {
  async loadPage(url: string) {
    const browser = await puppeteer.use(StealthPlugin()).launch({ headless: "new" });
    const page = await browser.newPage();

    await page.goto(url);

    const htmlContent = await page.content();
    await browser.close();

    return htmlContent;
  }
}
