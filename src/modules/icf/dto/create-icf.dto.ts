/*
 * Copyright (c) 2026, lapic-ufjf
 * Licensed under The MIT License [see LICENSE for details]
 */

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateIcfDto {
  @ApiProperty({ description: 'ICF title', example: 'Informed Consent' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: 'ICF description text', example: 'By participating you agree to...' })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({ description: 'Experiment ID', example: '64d2f4a8e5f9b20b1c8a9f10' })
  @IsNotEmpty()
  @IsString()
  experimentId: string;
  /*
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  researchTitle: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  agreementStatement: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  //TODO esperar resolver no banco
  //researchers

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  contact: string;
  */
}
