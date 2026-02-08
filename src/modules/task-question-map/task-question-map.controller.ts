/*
 * Copyright (c) 2026, marcelomachado
 * Licensed under The MIT License [see LICENSE for details]
 */

import {Controller, Get, Param} from '@nestjs/common';
import {TaskQuestionMapService} from './task-question-map.service';
import {ApiOperation} from '@nestjs/swagger';

@Controller('task-question-map')
export class TaskQuestionMapController {
  constructor(
    private readonly taskQuestionMapService: TaskQuestionMapService,
  ) {}

  @Get('/task/:taskId')
  @ApiOperation({summary: 'Get questions by taskId'})
  async findQuestions(@Param('taskId') taskId: string): Promise<string[]> {
    return await this.taskQuestionMapService.findQuestionsByTask(taskId);
  }
}
