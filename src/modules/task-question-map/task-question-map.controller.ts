import { Controller, Get, Param } from '@nestjs/common';
import { TaskQuestionMapService } from './task-question-map.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Task Question Map')
@Controller('task-question-map')
export class TaskQuestionMapController {
  constructor(
    private readonly taskQuestionMapService: TaskQuestionMapService,
  ) { }

  @Get('/task/:taskId')
  @ApiOperation({ summary: 'Get questions by taskId' })
  @ApiParam({ name: 'taskId', type: String, description: 'Task ID' })
  @ApiResponse({ status: 200, description: 'List of question IDs for the task.' })
  async findQuestions(@Param('taskId') taskId: string): Promise<string[]> {
    return await this.taskQuestionMapService.findQuestionsByTask(taskId);
  }
}
