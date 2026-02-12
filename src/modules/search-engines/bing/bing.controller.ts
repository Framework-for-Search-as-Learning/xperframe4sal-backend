/*
 * Copyright (c) 2026, lapic-ufjf
 * Licensed under The MIT License [see LICENSE for details]
 */

import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { BingService } from './bing.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Search Engine')
@ApiBearerAuth('jwt')
@UseGuards(AuthGuard('jwt'))
@Controller('search-engine')
export class BingController {

  private cache: Record<string, any> = {};

  constructor(private readonly bingService: BingService) { }

  @Get('bing')
  @ApiOperation({ summary: 'Search using Bing' })
  @ApiQuery({ name: 'query', type: String, required: true, description: 'Search query' })
  @ApiQuery({ name: 'start', type: Number, required: false, description: 'Start index for pagination' })
  @ApiQuery({ name: 'num', type: Number, required: false, description: 'Number of results per page' })
  @ApiResponse({ status: 200, description: 'Search results from Bing.' })
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
