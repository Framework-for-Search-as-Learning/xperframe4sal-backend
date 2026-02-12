/*
 * Copyright (c) 2026, lapic-ufjf
 * Licensed under The MIT License [see LICENSE for details]
 */

import {Module} from '@nestjs/common';
import {UserTaskService} from './user-task.service';
import {UserTaskController} from './user-task.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserTask} from './entities/user-tasks.entity';
import {UserModule} from '../user/user.module';
import {TaskModule} from '../task/task.module';
import {TaskQuestionMapModule} from '../task-question-map/task-question-map.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserTask]),
    TaskModule,
    UserModule,
    TaskQuestionMapModule,
  ],
  providers: [UserTaskService],
  controllers: [UserTaskController],
  exports: [UserTaskService],
})
export class UserTaskModule {}
