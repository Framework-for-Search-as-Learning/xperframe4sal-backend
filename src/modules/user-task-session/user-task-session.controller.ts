import { Controller, Get, Post, Body, Patch, Delete, UseGuards, Query, Param } from '@nestjs/common';
import { UserTaskSessionService } from './user-task-session.service';
import { HandlePageDto, UserTaskSession } from 'src/model/user-task-session.entity';
import { AuthGuard } from '@nestjs/passport';


@Controller('user-task-session')
export class UserTaskSessionController {
  constructor(private readonly userTaskSessionService: UserTaskSessionService) { }

  @Get()
  async findAll(
    @Query('userId') userId: string,
    @Query('taskId') taskId: string,
  ): Promise<UserTaskSession[]> {
    if (userId) {
      if (taskId) {
        return await this.userTaskSessionService.findByUserIdAndTaskId(userId, taskId);
      }
      return await this.userTaskSessionService.findByUserId(userId);
    }
    return await this.userTaskSessionService.findAll();
  }
  @Get()
  async findOne(
    @Param('id') id: string,
  ): Promise<UserTaskSession> {
    return await this.userTaskSessionService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() userTask: UserTaskSession): Promise<UserTaskSession> {
    return await this.userTaskSessionService.create(userTask);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete()
  async removeByUserIdAndTaskId(
    @Query('userId') userId: string,
    @Query('taskId') taskId: string
  ) {
    if (userId) {
      if (taskId) {
        return await this.userTaskSessionService.removeByUserIdAndTaskId(userId, taskId);
      }
    }
    return null;
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() userTask: UserTaskSession,
  ): Promise<UserTaskSession> {
    userTask.lastChangedAt = new Date();
    return await this.userTaskSessionService.update(id, userTask);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id/close-page/:rank')
  async closePage(
    @Param('id') id: string,
    @Param('rank') rank: number,
    @Body() closePageDto: HandlePageDto
  ): Promise<UserTaskSession> {
    try {
      const userTaskSession = await this.findOne(id);
      return await this.userTaskSessionService.closePage(id, rank, userTaskSession, closePageDto);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id/open-page/:rank')
  async openPage(
    @Param('id') id: string,
    @Param('rank') rank: number,
    @Body() openPageDto: HandlePageDto
  ): Promise<UserTaskSession> {
    try {
      const userTaskSession = await this.findOne(id);
      return await this.userTaskSessionService.openPage(id, rank, userTaskSession, openPageDto);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.userTaskSessionService.remove(id);
  }
}
