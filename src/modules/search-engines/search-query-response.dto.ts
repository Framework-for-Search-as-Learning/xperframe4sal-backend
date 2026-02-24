/*
 * Copyright (c) 2026, lapic-ufjf
 * Licensed under The MIT License [see LICENSE for details]
 */

import { ApiProperty } from '@nestjs/swagger';

export class SearchItemResponseDto {
  @ApiProperty({ description: 'Result title', example: 'Confirmation bias - Wikipedia' })
  title: string;

  @ApiProperty({ description: 'Result URL', example: 'https://en.wikipedia.org/wiki/Confirmation_bias' })
  link: string;

  @ApiProperty({ description: 'Result snippet', example: 'Confirmation bias is the tendency to search for...' })
  snippet: string;

  @ApiProperty({ description: 'Ranking position', example: 1 })
  rank: number;
}

export class SearchQueryResponseDto {
  @ApiProperty({ description: 'Search result items', type: [SearchItemResponseDto] })
  items: SearchItemResponseDto[];

  @ApiProperty({ description: 'Total number of results available', example: 100 })
  totalResults: number;
}
