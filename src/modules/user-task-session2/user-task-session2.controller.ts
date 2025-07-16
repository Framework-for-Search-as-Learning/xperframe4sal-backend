import {Body, Controller, Get, Param, Patch, Post, Query} from '@nestjs/common';
import {UserTaskSession2Service} from './user-task-session2.service';
import {UserTaskSession} from './entities/user-task-session.entity';
import {CreateUserTaskSessionDto} from './dto/create-userTaskSession.dto';
import {HandlePageDto} from './dto/handlePage.dto';

@Controller('user-task-session2')
export class UserTaskSession2Controller {
  constructor(
    private readonly userTaskSessionService: UserTaskSession2Service,
  ) {}

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

  //TODO closePage

  //TODO openPage
  @Patch(':id/open-page/:rank')
  async openPage(
    @Param('id') id: string,
    @Param('rank') rank: number,
    @Body() openPageDto: HandlePageDto,
  ): Promise<UserTaskSession> {
    return await this.userTaskSessionService.openPage(id, rank, openPageDto);
  }
}
