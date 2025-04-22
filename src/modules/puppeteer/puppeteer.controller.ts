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
