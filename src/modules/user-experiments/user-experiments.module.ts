/*
 * Copyright (c) 2026, lapic-ufjf
 * Licensed under The MIT License [see LICENSE for details]
 */

import {forwardRef, Module} from '@nestjs/common';
import {UserExperimentsService} from './user-experiments.service';
import {UserExperimentsController} from './user-experiments.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserExperiment} from './entities/user-experiments.entity';
import {UserModule} from '../user/user.module';
import {ExperimentsModule} from '../experiments/experiments.module';
import {UserTaskModule} from '../user-task/user-task.module';
import {TaskModule} from '../task/task.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserExperiment]),
    UserModule,
    forwardRef(() => ExperimentsModule),
    UserTaskModule,
    TaskModule,
  ],
  providers: [UserExperimentsService],
  controllers: [UserExperimentsController],
  exports: [UserExperimentsService],
})
export class UserExperimentsModule {}
