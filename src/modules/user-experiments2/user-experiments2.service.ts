import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserExperiment } from './entities/user-experiments.entity';
import { In, Repository } from 'typeorm';
import { CreateUserExperimentDto } from './dto/create-userExperiment.dto';
import { User2Service } from '../user2/user2.service';
import { Experiments2Service } from '../experiments2/experiments2.service';
import { UpdateUserExperimentDto } from './dto/update-userExperiment.dto';
import { User } from '../user2/entity/user.entity';
import { Experiment } from '../experiments2/entity/experiment.entity';
import { UserTask2Service } from '../user-task2/user-task2.service';
import { Task2Service } from '../task2/task2.service';

@Injectable()
export class UserExperiments2Service {
  constructor(
    @InjectRepository(UserExperiment)
    private readonly userExperimentRepository: Repository<UserExperiment>,
    private readonly userService: User2Service,
    @Inject(forwardRef(() => Experiments2Service))
    private readonly experimentService: Experiments2Service,
    private readonly userTask2Service: UserTask2Service,
    private readonly taskService: Task2Service,
  ) { }

  async create(
    createUserExperimentDto: CreateUserExperimentDto,
  ): Promise<UserExperiment> {
    try {
      const { userId, experimentId } = createUserExperimentDto;
      const user = await this.userService.findOne(userId);
      const experiment =
        await this.experimentService.findWithTasks(experimentId);
      const newUserExperiment = this.userExperimentRepository.create({
        user,
        experiment,
      });
      newUserExperiment.stepsCompleted = {
        icf: false,
        pre: false,
        post: false,
        task: false,
      };
      const savedUserExperiment =
        await this.userExperimentRepository.save(newUserExperiment);

      if (experiment.typeExperiment === 'within-subject') {
        const tasks = experiment.tasks;
        await Promise.all(
          tasks.map((task) => {
            this.userTask2Service.create({ taskId: task._id, userId: userId });
          }),
        );
      } else if (experiment.betweenExperimentType === 'random') {
        await this.userTask2Service.createRandom({
          userId,
          tasks: experiment.tasks,
        });

        //TODO retirar apos teste
        const taskIds = experiment.tasks.map((task) => task._id);
        const counts = await this.userTask2Service.getTaskCounts(taskIds);
      }
      return savedUserExperiment;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async createMany(
    userExperiments: UserExperiment[],
  ): Promise<UserExperiment[]> {
    try {
      const savedUserExperiments =
        await this.userExperimentRepository.save(userExperiments);
      return savedUserExperiments;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findAll(): Promise<UserExperiment[]> {
    return await this.userExperimentRepository.find();
  }

  async findByUserId(userId: string): Promise<UserExperiment[]> {
    return await this.userExperimentRepository.find({
      where: {
        user: { _id: userId },
        hasFinished: false
      },
    });
  }

  async findUsersByExperimentId(experimentId: string): Promise<User[]> {
    const userExperiments = await this.userExperimentRepository.find({
      where: { experiment: { _id: experimentId } },
      relations: ['user'],
    });
    return userExperiments.map((userExperiments) => userExperiments.user);
  }

  async findExperimentsByUserId(userId: string): Promise<Experiment[]> {
    const userExperiments = await this.userExperimentRepository.find({
      where: {
        user: { _id: userId },
        hasFinished: false
      },
      relations: ['experiment'],
    });
    return userExperiments.map((userExperiments) => userExperiments.experiment);
  }

  async findByUserAndExperimentId(
    userId: string,
    experimentId: string,
  ): Promise<UserExperiment> {
    return await this.userExperimentRepository.findOne({
      where: {
        user: { _id: userId },
        experiment: { _id: experimentId },
      },
    });
  }

  async update(
    id: string,
    updateUserExperimentDto: UpdateUserExperimentDto,
  ): Promise<UserExperiment> {
    const { userId, experimentId, stepsCompleted } = updateUserExperimentDto;
    let user, experiment;
    if (userId) {
      user = await this.userService.findOne(userId);
      if (!user) throw new Error('User not found');
    }

    if (experimentId) {
      experiment = await this.experimentService.find(experimentId);
      if (!experiment) throw new Error('Experiment not found');
    }
    await this.userExperimentRepository.update(
      { _id: id },
      { user, experiment, stepsCompleted },
    );
    return await this.userExperimentRepository.findOne({
      where: {
        _id: id,
      },
    });
  }

  async finish(id: string): Promise<UserExperiment> {
    await this.userExperimentRepository.update({ _id: id }, { hasFinished: true });
    return await this.userExperimentRepository.findOne({
      where: {
        _id: id,
      },
    });
  }

  async updateExperimentUsers(
    experimentId: string,
    newUsersId: string[],
  ): Promise<User[]> {
    const currentUsersInExperiment =
      await this.findUsersByExperimentId(experimentId);
    const currentUsersId = currentUsersInExperiment.map((user) => user._id);
    const usersToRemove = currentUsersId.filter(
      (user) => !newUsersId.includes(user),
    );
    const userToAdd = newUsersId.filter(
      (user) => !currentUsersId.includes(user),
    );

    if (usersToRemove.length !== 0) {
      await this.removeUsersFromExperiment(experimentId, usersToRemove);
    }

    if (userToAdd.length !== 0) {
      const newUserExperiments = userToAdd.map((userId) => ({
        userId,
        experimentId,
      }));
      await Promise.all(
        newUserExperiments.map((newUserExperiment) => {
          this.create(newUserExperiment);
        }),
      );
    }

    return currentUsersInExperiment.filter((user) =>
      newUsersId.includes(user._id),
    );
  }

  async removeUsersFromExperiment(
    experimentId: string,
    userIds: string[],
  ): Promise<void> {
    try {
      const tasksFromExperiment =
        await this.taskService.findByExperimentId(experimentId);
      const taskIds = tasksFromExperiment.map((task) => task._id);
      await this.userTask2Service.removeUsersFromTask(taskIds, userIds);
      await this.userExperimentRepository.delete({
        experiment_id: experimentId,
        user_id: In(userIds),
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async removeByUserIdAndExperimentId(userId: string, experimentId: string) {
    const result = await this.findByUserAndExperimentId(userId, experimentId);
    await this.userExperimentRepository.delete({
      user: { _id: userId },
      experiment: { _id: experimentId },
    });
    return result;
  }

  async remove(id: string) {
    const result = await this.userExperimentRepository.findOne({
      where: {
        _id: id,
      },
    });
    await this.userExperimentRepository.delete({ _id: id });
    return result;
  }

  async countUsersByExperimentId(experimentId: string): Promise<number> {
    return this.userExperimentRepository.count({
      where: {
        experiment_id: experimentId,
      },
    });
  }
}
