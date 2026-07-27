/*
 * Copyright (c) 2026, lapic-ufjf
 * Licensed under The MIT License [see LICENSE for details]
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '../user/user.module';
import { ExperimentDraft } from './entity/experiment-draft.entity';
import { ExperimentDraftController } from './experiment-draft.controller';
import { ExperimentDraftService } from './experiment-draft.service';

@Module({
  imports: [TypeOrmModule.forFeature([ExperimentDraft]), UserModule],
  providers: [ExperimentDraftService],
  controllers: [ExperimentDraftController],
  exports: [ExperimentDraftService],
})
export class ExperimentDraftModule { }
