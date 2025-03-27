import { Controller, Get, Query } from '@nestjs/common';
import { GoogleService } from './google.service';

@Controller('search-engine')
export class GoogleController {

  private cache: Record<string, any> = {};

  constructor(private readonly googleService: GoogleService) { }

  @Get('google')
  async query(
    @Query('query') query: string,
    @Query('start') startIndex: number = 0,
    @Query('num') resultsPerPage: number = 10,
  ) {
    query = query.trim();

    try {
      return await this.googleService.query(query, Number(startIndex), Number(resultsPerPage));
    } catch (error: any) {
      throw error;
    }
  }
}
