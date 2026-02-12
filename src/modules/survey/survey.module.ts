/*
 * Copyright (c) 2026, lapic-ufjf
 * Licensed under The MIT License [see LICENSE for details]
 */

import { forwardRef, Module } from '@nestjs/common';
import { SurveyController } from './survey.controller';
import { SurveyService } from './survey.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Survey } from './entity/survey.entity';
import { ExperimentModule } from '../experiment/experiment.module';
import { SurveyAnswerModule } from '../survey-answer/survey-answer.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Survey]),
    forwardRef(() => ExperimentModule),
    forwardRef(() => SurveyAnswerModule),
  ],
  controllers: [SurveyController],
  providers: [SurveyService],
  exports: [SurveyService],
})
export class SurveyModule { }
