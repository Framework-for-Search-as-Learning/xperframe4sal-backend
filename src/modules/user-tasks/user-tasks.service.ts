import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserTask } from 'src/model/user-task.entity';


@Injectable()
export class UserTasksService {
  constructor(
    @InjectModel('UserTasks')
    private readonly _userTaskModel: Model<UserTask>,
  ) { }

  async findOne(id: string): Promise<UserTask> {
    try {
      return await this._userTaskModel.findById(id).exec();
    } catch (error) {
      throw error;
    }
  }

  async create(userTask: UserTask): Promise<UserTask> {
    const newUserTask = new this._userTaskModel(userTask);
    return await newUserTask.save();
  }


  async findAll(): Promise<UserTask[]> {
    return await this._userTaskModel.find().exec();
  }

  async findByUserId(userId: string): Promise<UserTask[]> {
    return await this._userTaskModel.find({ userId: userId }).exec();
  }
  async findByUserIdAndTaskId(
    userId: string,
    taskId: string
  ): Promise<UserTask> {
    return await this._userTaskModel.findOne(
      { userId: userId, taskId: taskId }
    ).exec();
  }

  async removeByUserIdAndTaskId(userId: string, taskId: string) {
    return await this._userTaskModel.findOneAndDelete(
      { userId: userId, taskId: taskId }
    ).exec();
  }

  async remove(id: string) {
    return await this._userTaskModel.findByIdAndDelete(id).exec();
  }

  async update(id: string, userTask: UserTask): Promise<UserTask> {
    return await this._userTaskModel.findByIdAndUpdate(id, userTask, {
      new: true,
    }).exec();
  }

  async start(id: string, userTask: UserTask): Promise<UserTask> {
    userTask.isPaused = false;
    userTask.startTime = new Date();
    return await this._userTaskModel.findByIdAndUpdate(id, userTask, {
      new: true,
    }).exec();
  }

  async pause(id: string, userTask: UserTask): Promise<UserTask> {
    userTask.isPaused = true;
    if (!userTask.pauseTime) {
      userTask.pauseTime = [];
    }
    userTask.pauseTime.push(new Date())
    return await this._userTaskModel.findByIdAndUpdate(id, userTask, {
      new: true,
    }).exec();
  }

  async resume(id: string, userTask: UserTask): Promise<UserTask> {
    userTask.isPaused = false;
    if (!userTask.resumeTime) {
      userTask.resumeTime = [];
    }
    userTask.resumeTime.push(new Date());
    return await this._userTaskModel.findByIdAndUpdate(id, userTask, {
      new: true,
    }).exec();
  }

  async finish(id: string, userTask: UserTask): Promise<UserTask> {
    userTask.hasFinishedTask = true;
    userTask.endTime = new Date();
    return await this._userTaskModel.findByIdAndUpdate(id, userTask, {
      new: true,
    }).exec();
  }
}
