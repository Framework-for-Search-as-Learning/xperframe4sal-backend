import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {UserTaskSession} from './entities/user-task-session.entity';
import {Repository} from 'typeorm';
import {CreateUserTaskSessionDto} from './dto/create-userTaskSession.dto';
import {HandlePageDto} from './dto/handlePage.dto';
import {Page} from './entities/page.entity';

@Injectable()
export class UserTaskSession2Service {
  constructor(
    @InjectRepository(UserTaskSession)
    private readonly userTaskSessionRepository: Repository<UserTaskSession>,

    @InjectRepository(Page)
    private readonly pageRepository: Repository<Page>,
  ) {}

  async create(
    createUserTaskSessionDto: CreateUserTaskSessionDto,
  ): Promise<UserTaskSession> {
    const dataToSave = {
      ...createUserTaskSessionDto,
      timestamp: new Date(),
    };
    return await this.userTaskSessionRepository.save(dataToSave);
  }

  async findAll(): Promise<UserTaskSession[]> {
    return await this.userTaskSessionRepository.find();
  }

  async findOne(id: string): Promise<UserTaskSession> {
    return await this.userTaskSessionRepository.findOne({where: {_id: id}});
  }

  async findByUserId(userId: string): Promise<UserTaskSession[]> {
    return await this.userTaskSessionRepository.find({
      where: {user_id: userId},
    });
  }

  async finByUserIdAndTaskId(
    userId: string,
    taskId: string,
  ): Promise<UserTaskSession[]> {
    return await this.userTaskSessionRepository.find({
      where: {
        user_id: userId,
        task_id: taskId,
      },
    });
  }

  //TODO removeByUserIdAndTaskId

  //TODO remove

  //TODO update

  async openPage(
    id: string,
    rank: number,
    openPageDto: HandlePageDto,
  ): Promise<UserTaskSession> {
    try {
      const userTaskSession = await this.userTaskSessionRepository.findOne({
        where: {_id: id},
        relations: ['pages'],
      });
      console.log('UserTaskSession: ', userTaskSession);
      if (!userTaskSession) {
        throw new NotFoundException('Session not found');
      }
      //TODO verificar necessidade do attempt
      //let attempt = 0

      const page = this.pageRepository.create({
        title: openPageDto.title,
        url: openPageDto.url,
        startTime: new Date(),
        rank: rank,
        session: userTaskSession,
      });
      await this.pageRepository.save(page);
      return await this.userTaskSessionRepository.findOne({
        where: {_id: id},
        relations: ['pages'],
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async closePage(
    id: string,
    rank: number,
    closePageDto: HandlePageDto,
  ): Promise<UserTaskSession> {
    //TODO verificar necessidade do attempt
    //let attempt = 0
    try {
      const userTaskSession = await this.userTaskSessionRepository.findOne({
        where: {_id: id},
        relations: ['pages'],
      });
      if (!userTaskSession) {
        throw new NotFoundException('Session not found');
      }
      const pagesWithRank = userTaskSession.pages.filter(
        (page) => page.rank == rank && !page.endTime,
      );
      if (pagesWithRank.length === 0) {
        throw new NotFoundException('No open page found for this rank');
      }
      let pageToClose = null;
      for (const page of pagesWithRank) {
        if (!pageToClose || page.startTime > pageToClose.startTime) {
          pageToClose = page;
        }
      }

      pageToClose.endTime = new Date();
      await this.pageRepository.save(pageToClose);
      return await this.userTaskSessionRepository.findOne({
        where: {_id: id},
        relations: ['pages'],
      });
    } catch (error) {
      console.error(
        `Error closing modal ${rank}: ${closePageDto.title}: ${
          closePageDto.url
        } ${new Date()}`,
      );
      throw new Error(error.message);
    }
  }
}
