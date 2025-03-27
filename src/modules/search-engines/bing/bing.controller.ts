import { Controller, Get, Query } from '@nestjs/common';
import { BingService } from './bing.service';

@Controller('search-engine')
export class BingController {

  private cache: Record<string, any> = {};

  constructor(private readonly bingService: BingService) { }

  @Get('bing')
  async query(
    @Query('query') query: string,
    @Query('start') startIndex: number = 0,
    @Query('num') resultsPerPage: number = 10,
  ) {
    query = query.trim();

    try {
      return await this.bingService.query(query, Number(startIndex), Number(resultsPerPage));
    } catch (error: any) {
      throw error;
    }
  }
}
