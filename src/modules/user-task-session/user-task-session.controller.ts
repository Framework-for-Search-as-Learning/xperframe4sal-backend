import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UserTaskSessionService } from './user-task-session.service';
import { UserTaskSession } from './entities/user-task-session.entity';
import { CreateUserTaskSessionDto } from './dto/create-userTaskSession.dto';
import { HandlePageDto } from './dto/handlePage.dto';

@Controller('user-task-session')
export class UserTaskSessionController {
  constructor(
    private readonly userTaskSessionService: UserTaskSessionService,
  ) { }

  @Get()
  async findAll(
    @Query('userId') userId: string,
    @Query('taskId') taskId: string,
  ): Promise<UserTaskSession[]> {
    if (userId) {
      if (taskId) {
        return await this.userTaskSessionService.finByUserIdAndTaskId(
          userId,
          taskId,
        );
      }
      return await this.userTaskSessionService.findByUserId(userId);
    }
    return await this.userTaskSessionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserTaskSession> {
    return await this.userTaskSessionService.findOne(id);
  }

  @Post()
  async create(
    @Body() createUserTaskSessionDto: CreateUserTaskSessionDto,
  ): Promise<UserTaskSession> {
    return await this.userTaskSessionService.create(createUserTaskSessionDto);
  }

  //TODO removeByUserIdAndTaskId

  //TODO remove

  //TODO update

  @Patch(':id/open-page/:rank')
  async openPage(
    @Param('id') id: string,
    @Param('rank') rank: number,
    @Body() openPageDto: HandlePageDto,
  ): Promise<UserTaskSession> {
    return await this.userTaskSessionService.openPage(id, rank, openPageDto);
  }

  @Patch(':id/close-page/:rank')
  async closePage(
    @Param('id') id: string,
    @Param('rank') rank: number,
    @Body() closePageDto: HandlePageDto,
  ): Promise<UserTaskSession> {
    return await this.userTaskSessionService.closePage(id, rank, closePageDto);
  }
}
