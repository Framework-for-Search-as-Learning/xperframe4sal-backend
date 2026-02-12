import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { PuppeteerService } from './puppeteer.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController()
@ApiBearerAuth('jwt')
@UseGuards(AuthGuard('jwt'))
@Controller('puppeteer')
export class PuppeteerController {
  constructor(private readonly puppeteerService: PuppeteerService) { }

  @Get('load-page')
  async loadPage(@Query('url') url: string) {
    return this.puppeteerService.loadPage(url);
  }
}
