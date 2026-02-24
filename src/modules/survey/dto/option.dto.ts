/*
 * Copyright (c) 2026, lapic-ufjf
 * Licensed under The MIT License [see LICENSE for details]
 */

import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
} from 'class-validator';

export class OptionDTO {
  @ApiProperty({ description: 'Option statement', example: 'Strongly agree' })
  @IsString()
  statement: string;

  @ApiProperty({ description: 'Score assigned to the option', example: 5 })
  @IsNumber()
  score: number;
}
