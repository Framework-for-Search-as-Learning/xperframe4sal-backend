/*
 * Copyright (c) 2026, lapic-ufjf
 * Licensed under The MIT License [see LICENSE for details]
 */

import {forwardRef, Module} from '@nestjs/common';
import {ExperimentsService} from './experiments.service';
import {ExperimentsController} from './experiments.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Experiment} from './entity/experiment.entity';
import {UserExperimentsModule} from '../user-experiments/user-experiments.module';
import {UserTaskModule} from '../user-task/user-task.module';
import {UserModule} from '../user/user.module';
import {TaskModule} from '../task/task.module';
import {SurveyModule} from '../survey/survey.module';
import {IcfModule} from '../icf/icf.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Experiment]),
    forwardRef(() => UserExperimentsModule),
    UserTaskModule,
    UserModule,
    TaskModule,
    SurveyModule,
    forwardRef(() => IcfModule),
  ],
  providers: [ExperimentsService],
  controllers: [ExperimentsController],
  exports: [ExperimentsService],
})
export class ExperimentsModule {}
