/*
 * Copyright (c) 2026, lapic-ufjf
 * Licensed under The MIT License [see LICENSE for details]
 */

import {forwardRef, Module} from '@nestjs/common';
import {TaskService} from './task.service';
import {TaskController} from './task.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Task} from './entities/task.entity';
import {ExperimentsModule} from '../experiments/experiments.module';
import {SurveyModule} from '../survey/survey.module';
import {TaskQuestionMapModule} from '../task-question-map/task-question-map.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    forwardRef(() => ExperimentsModule),
    SurveyModule,
    forwardRef(() => TaskQuestionMapModule),
  ],
  providers: [TaskService],
  controllers: [TaskController],
  exports: [TaskService],
})
export class TaskModule {}
