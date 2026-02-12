/*
 * Copyright (c) 2026, lapic-ufjf
 * Licensed under The MIT License [see LICENSE for details]
 */

import {Module} from '@nestjs/common';
import {UserTaskSessionService} from './user-task-session.service';
import {UserTaskSessionController} from './user-task-session.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserTaskSession} from './entities/user-task-session.entity';
import {Page} from './entities/page.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserTaskSession, Page])],
  providers: [UserTaskSessionService],
  controllers: [UserTaskSessionController],
})
export class UserTaskSessionModule {}
