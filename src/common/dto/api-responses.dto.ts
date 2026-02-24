/*
 * Copyright (c) 2026, lapic-ufjf
 * Licensed under The MIT License [see LICENSE for details]
 */

import { ApiProperty } from '@nestjs/swagger';

export class MessageResponseDto {
  @ApiProperty({ description: 'Operation result message', example: 'Operation completed successfully.' })
  message: string;
}

export class ErrorResponseDto {
  @ApiProperty({ description: 'HTTP status code', example: 404 })
  statusCode: number;

  @ApiProperty({ description: 'Error message', example: 'Resource not found.' })
  message: string;

  @ApiProperty({ description: 'Error name', example: 'Not Found', required: false })
  error?: string;
}

export class CountUsersResponseDto {
  @ApiProperty({ description: 'Total users in experiment', example: 42 })
  totalUsers: number;

  @ApiProperty({ description: 'Users that completed the experiment', example: 30 })
  completedResponses: number;
}
