/*
 * Copyright (c) 2026, lapic-ufjf
 * Licensed under The MIT License [see LICENSE for details]
 */

import {IsNotEmpty, IsString} from 'class-validator';
import {Task} from 'src/modules/task/entities/task.entity';

export class CreateUserTaskRandomDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

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
