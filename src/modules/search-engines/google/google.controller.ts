import {Controller, Get, Query} from '@nestjs/common';
import {GoogleService} from './google.service';
import {ApiExcludeController} from '@nestjs/swagger';

@ApiExcludeController()
@Controller('search-engine')
export class GoogleController {
  private cache: Record<string, any> = {};

  constructor(private readonly googleService: GoogleService) {}

  @Get('google')
  async query(
    @Query('query') query: string,
    @Query('experimentId') experimentId: string,
    @Query('start') startIndex: number = 0,
    @Query('num') resultsPerPage: number = 10,
  ) {
    query = query.trim();

    try {
      return await this.googleService.query(
        query,
        Number(startIndex),
        Number(resultsPerPage),
        experimentId,
      );
    } catch (error: any) {
      throw error;
    }
  }
}
