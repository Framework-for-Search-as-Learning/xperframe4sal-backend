import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  UseGuards,
  Query,
  Param,
} from '@nestjs/common';
import {UserTasksService} from './user-tasks.service';
import {UserTask} from 'src/model/user-task.entity';
import {AuthGuard} from '@nestjs/passport';
import {ApiExcludeController} from '@nestjs/swagger';

@ApiExcludeController()
@Controller('user-tasks')
export class UserTasksController {
  constructor(private readonly userTasksService: UserTasksService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserTask> {
    return await this.userTasksService.findOne(id);
  }

  @Get()
  async findAll(
    @Query('userId') userId: string,
    @Query('taskId') taskId: string,
  ): Promise<UserTask[] | UserTask> {
    if (userId) {
      if (taskId) {
        return await this.userTasksService.findByUserIdAndTaskId(
          userId,
          taskId,
        );
      }
      return await this.userTasksService.findByUserId(userId);
    }
    return await this.userTasksService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() userTask: UserTask): Promise<UserTask> {
    return await this.userTasksService.create(userTask);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete()
  async removeByUserIdAndTaskId(
    @Query('userId') userId: string,
    @Query('taskId') taskId: string,
  ) {
    if (userId) {
      if (taskId) {
        return await this.userTasksService.removeByUserIdAndTaskId(
          userId,
          taskId,
        );
      }
    }
    return null;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.userTasksService.remove(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() userTask: UserTask,
  ): Promise<UserTask> {
    userTask.lastChangedAt = new Date();
    return await this.userTasksService.update(id, userTask);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id/start')
  async start(@Param('id') id: string): Promise<UserTask> {
    const userTask = await this.userTasksService.findOne(id);
    return await this.userTasksService.start(id, userTask);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id/pause')
  async pause(@Param('id') id: string): Promise<UserTask> {
    const userTask = await this.userTasksService.findOne(id);
    return await this.userTasksService.pause(id, userTask);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id/resume')
  async resume(@Param('id') id: string): Promise<UserTask> {
    const userTask = await this.userTasksService.findOne(id);
    return await this.userTasksService.resume(id, userTask);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id/finish')
  async finish(@Param('id') id: string): Promise<UserTask> {
    const userTask = await this.userTasksService.findOne(id);
    return await this.userTasksService.finish(id, userTask);
  }
}
