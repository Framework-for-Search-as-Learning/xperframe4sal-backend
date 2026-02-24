/*
 * Copyright (c) 2026, lapic-ufjf
 * Licensed under The MIT License [see LICENSE for details]
 */

import { ApiProperty } from '@nestjs/swagger';

export class UserTaskResponseDto {
  @ApiProperty({ description: 'UserTask ID', example: '1a0e8c1a-3f7a-4a02-92f9-4b0d7a5d2a12' })
  _id: string;

  @ApiProperty({ description: 'User ID', example: '64d2f4a8e5f9b20b1c8a9f10' })
  user_id: string;

  @ApiProperty({ description: 'Task ID', example: '64d2f4a8e5f9b20b1c8a9f22' })
  task_id: string;

  @ApiProperty({ description: 'Whether task was finished by user', example: false })
  hasFinishedTask: boolean;

  @ApiProperty({ description: 'Whether task is currently paused', example: false })
  isPaused: boolean;

  @ApiProperty({ description: 'Task start time', example: '2026-02-24T13:30:00.000Z', required: false })
  startTime?: Date;

  @ApiProperty({ description: 'Pause timestamps', type: [Date], example: ['2026-02-24T13:35:00.000Z'], required: false })
  pauseTime?: Date[];

  @ApiProperty({ description: 'Resume timestamps', type: [Date], example: ['2026-02-24T13:36:00.000Z'], required: false })
  resumeTime?: Date[];

  @ApiProperty({ description: 'Task end time', example: '2026-02-24T13:50:00.000Z', required: false })
  endTime?: Date;

  @ApiProperty({ description: 'Task metadata', example: { confidence: 4 }, required: false })
  metadata?: Record<string, unknown>;

  @ApiProperty({ description: 'Whether the record is active', example: true })
  isActive: boolean;

  @ApiProperty({ description: 'Creation timestamp', example: '2026-02-24T13:30:00.000Z' })
  createdAt: Date;

  @ApiProperty({ description: 'Last update timestamp', example: '2026-02-24T13:40:00.000Z' })
  lastChangeAt: Date;
}
