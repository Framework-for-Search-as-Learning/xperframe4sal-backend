/*
 * Copyright (c) 2026, marcelomachado
 * Licensed under The MIT License [see LICENSE for details]
 */

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags, ApiBody, ApiQuery } from '@nestjs/swagger';
import { UserTaskService } from './user-task.service';
import { UserTask } from './entities/user-tasks.entity';
import { CreateUserTaskDto } from './dto/create-userTask.dto';
import { UpdateUserTaskDto } from './dto/update-userTask.dto';
import { User } from '../user/entity/user.entity';
import { Task } from '../task/entities/task.entity';
import { TimeEditUserTaskDto } from './dto/timeEditUserTaskDTO';

@ApiTags('user-task')
@Controller('user-task')
export class UserTaskController {
  constructor(private readonly userTaskService: UserTaskService) { }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user task by id' })
  async findOne(@Param('id') id: string): Promise<UserTask> {
    return await this.userTaskService.findOne(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all user tasks or filter by userId and taskId' })
  @ApiQuery({
    name: 'userId',
    required: false,
    type: String,
    description: 'User ID',
  })
  @ApiQuery({
    name: 'taskId',
    required: false,
    type: String,
    description: 'Task ID',
  })
  async findAll(
    @Query('userId') userId: string,
    @Query('taskId') taskId: string,
  ): Promise<UserTask[] | UserTask> {
    if (userId) {
      if (taskId) {
        return await this.userTaskService.findByUserIdAndTaskId(userId, taskId);
      }
      return await this.userTaskService.findByUserId(userId);
    }
    return await this.userTaskService.findAll();
  }

  @Get('user/:userId/experiment/:experimentId')
  @ApiOperation({
    summary: 'Get all userTasks associated with a specific user and experiment',
  })
  async findByExperimentId(
    @Param('userId') userId: string,
    @Param('experimentId') experimentId: string,
  ): Promise<UserTask[]> {
    return await this.userTaskService.findByUserIdAndExperimentId(
      userId,
      experimentId,
    );
  }
  @Get('task/:taskId/users')
  @ApiOperation({ summary: 'Get all users associated with a specific task' })
  async findUsersByTaskId(@Param('taskId') taskId: string): Promise<User[]> {
    return await this.userTaskService.findUsersByTaskId(taskId);
  }

  @Get('user/:userId/tasks')
  @ApiOperation({ summary: 'Get all tasks associated with a specific user' })
  async findTasksByUserId(@Param('userId') userId: string): Promise<Task[]> {
    return await this.userTaskService.findTasksByUserId(userId);
  }

  @Get('/user/:userId/experiment/:experimentId/tasks')
  @ApiOperation({
    summary: 'get all tasks associated with a specific user and experiment',
  })
  async findTasksByUserIdAndExperimentId(
    @Param('userId') userId: string,
    @Param('experimentId') experimentId: string,
  ): Promise<Task[]> {
    return await this.userTaskService.findTasksByUserIdAndExperimentId(
      userId,
      experimentId,
    );
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user task' })
  @ApiBody({ type: CreateUserTaskDto })
  async create(
    @Body() createUserTaskDto: CreateUserTaskDto,
  ): Promise<UserTask> {
    return await this.userTaskService.create(createUserTaskDto);
  }

  /*
  @Post('/random')
  @ApiOperation({summary: 'Create a new user task using random method'})
  //@ApiBody({type: CreateUserTaskDto})
  async createRandom(
    @Body() createUserTaskRandomDto: CreateUserTaskRandomDto,
  ): Promise<UserTask> {
    return await this.userTaskService.createRandom(createUserTaskRandomDto);
  }
  */

  @Delete()
  @ApiOperation({ summary: 'Remove a user task by userId and taskId' })
  @ApiQuery({
    name: 'userId',
    required: true,
    type: String,
    description: 'User ID',
  })
  @ApiQuery({
    name: 'taskId',
    required: true,
    type: String,
    description: 'Task ID',
  })
  async removeByUserIdAndTaskId(
    @Query('userId') userId: string,
    @Query('taskId') taskId: string,
  ): Promise<UserTask> {
    if (userId && taskId) {
      return await this.userTaskService.removeByUserIdAndTaskId(userId, taskId);
    }
    return null;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a user task by id' })
  async remove(@Param('id') id: string): Promise<UserTask> {
    return await this.userTaskService.remove(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a user task' })
  @ApiBody({ type: UpdateUserTaskDto })
  async update(
    @Param('id') id: string,
    @Body() updateUserTaskDto: UpdateUserTaskDto,
  ): Promise<UserTask> {
    return await this.update(id, updateUserTaskDto);
  }

  @Patch(':id/start')
  @ApiOperation({ summary: 'Start a user task' })
  async start(@Param('id') id: string): Promise<UserTask> {
    const userTask = await this.userTaskService.findOne(id);
    const isPaused = userTask.isPaused;
    const startTime = userTask.startTime;
    return await this.userTaskService.start(id, { isPaused, startTime });
  }

  @Patch(':id/pause')
  @ApiOperation({ summary: 'Pause a user task' })
  async pause(@Param('id') id: string): Promise<UserTask> {
    const userTask = await this.userTaskService.findOne(id);
    const isPaused = userTask.isPaused;
    const pauseTime = userTask.pauseTime;
    return await this.userTaskService.pause(id, { isPaused, pauseTime });
  }

  @Patch(':id/resume')
  @ApiOperation({ summary: 'Resume a user task' })
  async resume(@Param('id') id: string): Promise<UserTask> {
    const userTask = await this.userTaskService.findOne(id);
    const isPaused = userTask.isPaused;
    const resumeTime = userTask.resumeTime;
    return await this.userTaskService.resume(id, { isPaused, resumeTime });
  }

  @Patch(':id/finish')
  @ApiOperation({ summary: 'Finish a user task' })
  @ApiBody({ type: TimeEditUserTaskDto })
  async finish(@Param('id') id: string, @Body() timeEditUserTaskDto: TimeEditUserTaskDto): Promise<UserTask> {
    return await this.userTaskService.finish(id, timeEditUserTaskDto);
  }
}
