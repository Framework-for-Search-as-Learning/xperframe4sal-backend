/*
 * Copyright (c) 2026, lapic-ufjf
 * Licensed under The MIT License [see LICENSE for details]
 */

import { ApiProperty } from '@nestjs/swagger';

export class UserTaskSessionPageResponseDto {
  @ApiProperty({ description: 'Page ID', example: '8e2c1a3f-7a4a-4029-92f9-4b0d7a5d2a99' })
  _id: string;

  @ApiProperty({ description: 'Session ID', example: '2c1a3f7a-4a02-92f9-4b0d-7a5d2a118e8c' })
  session_id: string;

  @ApiProperty({ description: 'Page title', example: 'Example Article' })
  title: string;

  @ApiProperty({ description: 'Visited URL', example: 'https://example.com/article' })
  url: string;

  @ApiProperty({ description: 'Open timestamp', example: '2026-02-24T13:31:00.000Z' })
  startTime: Date;

  @ApiProperty({ description: 'Close timestamp', example: '2026-02-24T13:33:00.000Z', required: false })
  endTime?: Date;

  @ApiProperty({ description: 'Result rank', example: 1 })
  rank: number;
}

export class UserTaskSessionResponseDto {
  @ApiProperty({ description: 'Session ID', example: '2c1a3f7a-4a02-92f9-4b0d-7a5d2a118e8c' })
  _id: string;

  @ApiProperty({ description: 'Session timestamp', example: '2026-02-24T13:30:00.000Z' })
  timestamp: Date;

  @ApiProperty({ description: 'SERP number', example: 1 })
  serpNumber: number;

  @ApiProperty({ description: 'Search query used by participant', example: 'confirmation bias examples' })
  query: string;

  @ApiProperty({ description: 'Task ID', example: '64d2f4a8e5f9b20b1c8a9f22' })
  task_id: string;

  @ApiProperty({ description: 'User ID', example: '64d2f4a8e5f9b20b1c8a9f10' })
  user_id: string;

  @ApiProperty({ description: 'Pages visited during session', type: [UserTaskSessionPageResponseDto], required: false })
  pages?: UserTaskSessionPageResponseDto[];

  @ApiProperty({ description: 'Whether the record is active', example: true })
  isActive: boolean;

  @ApiProperty({ description: 'Creation timestamp', example: '2026-02-24T13:30:00.000Z' })
  createdAt: Date;

  @ApiProperty({ description: 'Last update timestamp', example: '2026-02-24T13:40:00.000Z' })
  lastChangeAt: Date;
}
