/*
 * Copyright (c) 2026, marcelomachado
 * Licensed under The MIT License [see LICENSE for details]
 */

import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsOptional, IsString} from 'class-validator';

export class CreateIcfDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty()
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
