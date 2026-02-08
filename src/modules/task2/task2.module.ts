/*
 * Copyright (c) 2026, marcelomachado
 * Licensed under The MIT License [see LICENSE for details]
 */

import {forwardRef, Module} from '@nestjs/common';
import {Task2Service} from './task2.service';
import {Task2Controller} from './task2.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Task} from './entities/task.entity';
import {Experiments2Module} from '../experiments2/experiments2.module';
import {Survey2Module} from '../survey2/survey2.module';
import {TaskQuestionMapModule} from '../task-question-map/task-question-map.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    forwardRef(() => Experiments2Module),
    Survey2Module,
    forwardRef(() => TaskQuestionMapModule),
  ],
  providers: [Task2Service],
  controllers: [Task2Controller],
  exports: [Task2Service],
})
export class Task2Module {}
