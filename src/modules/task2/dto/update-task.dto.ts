/*
 * Copyright (c) 2026, marcelomachado
 * Licensed under The MIT License [see LICENSE for details]
 */

import {PartialType} from '@nestjs/swagger';
import {CreateTaskDto} from './create-task.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {}
