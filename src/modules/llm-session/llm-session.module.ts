/*
 * Copyright (c) 2026, lapic-ufjf
 * Licensed under The MIT License [see LICENSE for details]
 */

import { Module } from '@nestjs/common';
import { LlmSessionService } from './llm-session.service';
import { LlmSessionController } from './llm-session.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LlmSession } from './entity/llm-session.entity';
import { LlmMessage } from './entity/llm-message.entity';
import { Task } from 'src/modules/task/entities/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LlmSession, LlmMessage, Task])],
  providers: [LlmSessionService],
  controllers: [LlmSessionController],
  exports: [LlmSessionService]
})
export class LlmSessionModule { }
