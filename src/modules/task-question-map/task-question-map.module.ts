/*
 * Copyright (c) 2026, marcelomachado
 * Licensed under The MIT License [see LICENSE for details]
 */

import {forwardRef, Module} from '@nestjs/common';
import {TaskQuestionMapService} from './task-question-map.service';
import {TaskQuestionMapController} from './task-question-map.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {TaskQuestionMap} from './entity/taskQuestionMap.entity';
import {Task2Module} from '../task2/task2.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskQuestionMap]),
    forwardRef(() => Task2Module),
  ],
  providers: [TaskQuestionMapService],
  controllers: [TaskQuestionMapController],
  exports: [TaskQuestionMapService],
})
export class TaskQuestionMapModule {}
