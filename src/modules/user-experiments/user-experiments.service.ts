import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserExperiment } from 'src/model/user-experiment.entity';
// import { UserTasksService } from '../user-tasks/user-tasks.service';
// import { ExperimentsService } from '../experiments/experiments.service';
// import { UserTask } from 'src/model/user-task.entity';

@Injectable()
export class UserExperimentsService {

  constructor(
    @InjectModel('UserExperiments')
    private readonly _userExperimentModel: Model<UserExperiment>,
    // @Inject(UserTasksService)
    // private readonly userTasksService: UserTasksService,
    // @Inject(ExperimentsService)
    // private readonly experimentsService: ExperimentsService,
  ) { }

  async create(userExperiment: UserExperiment): Promise<UserExperiment> {

    try {
      const newUserExperiment = new this._userExperimentModel(userExperiment);
      newUserExperiment.stepsCompleted = {
        "icf": false,
        "pre": false,
        "post": false,
        "task": false,
      };

      const savedUserExperiment = await newUserExperiment.save();
      return savedUserExperiment;
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<UserExperiment[]> {
    return await this._userExperimentModel.find().exec();
  }

  async findByUserId(userId: string): Promise<UserExperiment[]> {
    return await this._userExperimentModel.find({ userId: userId });
  }

  async findByUserIdAndExperimentId(
    userId: string,
    experimentId: string
  ): Promise<UserExperiment> {
    return await this._userExperimentModel.findOne(
      { userId: userId, experimentId: experimentId }
    ).exec();
  }

  async update(id: string, userExperiment: UserExperiment): Promise<UserExperiment> {
    const result = await this._userExperimentModel.findByIdAndUpdate(id, userExperiment, {
      new: true,
    }).exec();
    return result;
  }

  async removeByUserIdAndExperimentId(userId: string, experimentId: string) {
    return await this._userExperimentModel.findOneAndDelete(
      { userId: userId, experimentId: experimentId }
    ).exec();
  }
  async remove(id: string) {
    return await this._userExperimentModel.findByIdAndDelete(id).exec();
  }
}
