/*
 * Copyright (c) 2026, lapic-ufjf
 * Licensed under The MIT License [see LICENSE for details]
 */

import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsString} from 'class-validator';

export class UpdatePasswordDto {
  @ApiProperty({description: 'Current password', example: 'OldPassword123'})
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @ApiProperty({description: 'New password', example: 'NewStrongPassword123'})
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
