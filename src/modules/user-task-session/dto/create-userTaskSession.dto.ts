/*
 * Copyright (c) 2026, lapic-ufjf
 * Licensed under The MIT License [see LICENSE for details]
 */

import { ApiProperty } from '@nestjs/swagger';

export class CreateUserTaskSessionDto {
  @ApiProperty({ description: 'SERP number or page index', example: 1 })
  serpNumber: number;

  @ApiProperty({ description: 'Search query used', example: 'confirmation bias examples' })
  query: string;

  @ApiProperty({ description: 'User ID', example: '64d2f4a8e5f9b20b1c8a9f10' })
  user_id: string;

  @ApiProperty({ description: 'Task ID', example: '64d2f4a8e5f9b20b1c8a9f22' })
  task_id: string;
}
