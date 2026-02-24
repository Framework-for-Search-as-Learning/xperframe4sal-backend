/*
 * Copyright (c) 2026, lapic-ufjf
 * Licensed under The MIT License [see LICENSE for details]
 */

import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty({ description: 'Authenticated user ID', example: '64d2f4a8e5f9b20b1c8a9f10' })
  id: string;

  @ApiProperty({ description: 'Authenticated user email', example: 'user@example.com' })
  email: string;

  @ApiProperty({ description: 'Whether the user is a researcher', example: false })
  researcher: boolean;

  @ApiProperty({ description: 'User first name', example: 'Maria' })
  name: string;

  @ApiProperty({ description: 'User last name', example: 'Silva' })
  lastName: string;

  @ApiProperty({ description: 'JWT access token', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  accessToken: string;

  @ApiProperty({ description: 'Token expiration timestamp (epoch ms)', example: 1768928400000 })
  expiredAt: number;
}
