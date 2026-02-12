/*
 * Copyright (c) 2026, lapic-ufjf
 * Licensed under The MIT License [see LICENSE for details]
 */

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Task } from 'src/modules/task/entities/task.entity';

export class CreateUserTaskRandomDto {
  @ApiProperty({ description: 'User ID', example: '64d2f4a8e5f9b20b1c8a9f10' })
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty({ description: 'Candidate task list', type: [Task] })
  @IsNotEmpty()
  tasks: Task[];

  /*
  @ApiProperty({type: [String]})
  @IsNotEmpty()
  @IsArray()
  @IsString({each: true})
  taskIds: string[];
  */
}
