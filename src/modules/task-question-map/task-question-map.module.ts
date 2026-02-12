/*
 * Copyright (c) 2026, lapic-ufjf
 * Licensed under The MIT License [see LICENSE for details]
 */

import { forwardRef, Module } from '@nestjs/common';
import { TaskQuestionMapService } from './task-question-map.service';
import { TaskQuestionMapController } from './task-question-map.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskQuestionMap } from './entity/taskQuestionMap.entity';
import { TaskModule } from '../task/task.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskQuestionMap]),
    forwardRef(() => TaskModule),
  ],
  providers: [TaskQuestionMapService],
  controllers: [TaskQuestionMapController],
  exports: [TaskQuestionMapService],
})
export class TaskQuestionMapModule { }
