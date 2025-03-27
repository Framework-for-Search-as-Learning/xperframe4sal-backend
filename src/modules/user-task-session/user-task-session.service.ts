import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HandlePageDto, Page, UserTaskSession } from 'src/model/user-task-session.entity';


@Injectable()
export class UserTaskSessionService {
  constructor(
    @InjectModel('UserTaskSession')
    private readonly userTaskSessionSessionModel: Model<UserTaskSession>,
  ) { }

  async create(userTaskSession: UserTaskSession): Promise<UserTaskSession> {
    userTaskSession.timestamp = new Date();
    const newUserTask = new this.userTaskSessionSessionModel(userTaskSession);
    return await newUserTask.save();
  }

  async findAll(): Promise<UserTaskSession[]> {
    return await this.userTaskSessionSessionModel.find().exec();
  }

  async findOne(id: string): Promise<UserTaskSession> {
    return await this.userTaskSessionSessionModel.findById(id).exec();
  }

  async findByUserId(userId: string): Promise<UserTaskSession[]> {
    return await this.userTaskSessionSessionModel.find({ userId: userId });
  }

  async findByUserIdAndTaskId(
    userId: string,
    taskId: string
  ): Promise<UserTaskSession[]> {
    return await this.userTaskSessionSessionModel.find(
      { userId: userId, taskId: taskId }
    ).exec();
  }

  async removeByUserIdAndTaskId(userId: string, taskId: string) {
    return await this.userTaskSessionSessionModel.findOneAndDelete(
      { userId: userId, taskId: taskId }
    ).exec();
  }

  async remove(id: string) {
    return await this.userTaskSessionSessionModel.findByIdAndDelete(id).exec();;
  }

  async update(id: string, userTaskSession: UserTaskSession): Promise<UserTaskSession> {
    return await this.userTaskSessionSessionModel.findByIdAndUpdate(id, userTaskSession, {
      new: true,
    });
  }

  async openPage(id: string, rank: number, userTaskSession: UserTaskSession, openPageDto: HandlePageDto): Promise<UserTaskSession> {
    let attempt = 0;
    while (attempt < 2) {
      try {
        if (userTaskSession) {
          if (!userTaskSession.pages) {
            userTaskSession.pages = {}
          }

          if (!userTaskSession.pages[rank]) {
            userTaskSession.pages[rank] = [];
          }
          const page = new Page(openPageDto.title, openPageDto.url, new Date());
          userTaskSession.pages[rank].push(page);
          const result = await this.userTaskSessionSessionModel.findByIdAndUpdate(id, userTaskSession, {
            new: true,
          });

          attempt = 2;
          return result;
        }
        attempt++;
        return userTaskSession;

      } catch (error) {
        attempt++;
        console.error(`Error opening modal ${rank}: ${openPageDto.title}: ${openPageDto.url} ${new Date()}`);
        throw new Error(error.message);
      }
    }
  }

  async closePage(id: string, rank: number, userTaskSession: UserTaskSession, closePageDto: HandlePageDto): Promise<UserTaskSession> {
    let attempt = 0;
    while (attempt < 2) {
      try {
        if (userTaskSession) {
          userTaskSession.pages[rank][userTaskSession.pages[rank].length - 1].endTime = new Date();
          const result = await this.userTaskSessionSessionModel.findByIdAndUpdate(id, userTaskSession, {
            new: true,
          });
          attempt = 2;
          return result;
        }

        attempt++;
        return userTaskSession;
      }
      catch (error) {
        attempt++;
        console.error(`Error closing modal ${rank}: ${closePageDto.title}: ${closePageDto.url} ${new Date()}`);
        throw new Error(error.message);
      }
    }
  }
}
