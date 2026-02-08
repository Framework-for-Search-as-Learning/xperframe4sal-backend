/*
 * Copyright (c) 2026, marcelomachado
 * Licensed under The MIT License [see LICENSE for details]
 */

import {Controller, Get, Query} from '@nestjs/common';
import {PuppeteerService} from './puppeteer.service';
import {ApiExcludeController} from '@nestjs/swagger';

@ApiExcludeController()
@Controller('puppeteer')
export class PuppeteerController {
  constructor(private readonly puppeteerService: PuppeteerService) {}

  @Get('load-page')
  async loadPage(@Query('url') url: string) {
    return this.puppeteerService.loadPage(url);
  }
}
