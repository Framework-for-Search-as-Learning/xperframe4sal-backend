import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {UserTask} from './entities/user-tasks.entity';
import {Repository} from 'typeorm';
import {CreateUserTaskDto} from './dto/create-userTask.dto';
import {User2Service} from '../user2/user2.service';
import {Task2Service} from '../task2/task2.service';
import {UpdateUserTaskDto} from './dto/update-userTask.dto';
import {TimeEditUserTaskDto} from './dto/timeEditUserTaskDTO';
import {SurveyAnswer2Service} from '../survey-answer2/survey-answer2.service';
import {CreateUserTaskRandomDto} from './dto/create-userTaskRandom.dto';
import {CreateUserTaskScoreDto} from './dto/create-userTaskScore.dto';
import {CreateUserTaskQuestScoreDto} from './dto/create-userTaskQuestionScore';
import {CreateUserTaskAvgQuestScoreDto} from './dto/create-userTaskAvgQuestScore.dto';

@Injectable()
export class UserTask2Service {
  constructor(
    @InjectRepository(UserTask)
    private readonly userTaskRepository: Repository<UserTask>,

    private readonly userService: User2Service,
    private readonly taskService: Task2Service,
    private readonly surveyAnswerService: SurveyAnswer2Service,
  ) {}
  async findOne(id: string): Promise<UserTask> {
    try {
      return await this.userTaskRepository.findOne({
        where: {
          _id: id,
        },
      });
    } catch (error) {
      throw error;
    }
  }
  async create(createUserTaskDto: CreateUserTaskDto): Promise<UserTask> {
    try {
      const {userId, taskId} = createUserTaskDto;
      const user = await this.userService.findOne(userId);
      if (!user) {
        throw new NotFoundException('Usuario nao foi encontrado');
      }
      const task = await this.taskService.findOne(taskId);
      if (!task) {
        throw new NotFoundException('Task nao foi encontrada');
      }
      const newUserTask = this.userTaskRepository.create({
        user,
        task,
      });
      return await this.userTaskRepository.save(newUserTask);
    } catch (error) {
      throw error;
    }
  }

  async createBySurveyScore(
    createUserTaskScoreDto: CreateUserTaskScoreDto,
  ): Promise<UserTask> {
    try {
      const {userId, surveyId, taskIds} = createUserTaskScoreDto;
      console.log(taskIds);
      const surveyAnswer =
        await this.surveyAnswerService.findByUserIdAndSurveyId(
          userId,
          surveyId,
        );
      if (!surveyAnswer) {
        throw new NotFoundException('SurveyAnswer nao encontrado.');
      }
      const score = surveyAnswer.score;
      const taskList = await this.taskService.findMany(taskIds);
      let selectedTaskId;
      for (const task of taskList) {
        if (score >= task.min_score && score <= task.max_score) {
          selectedTaskId = task._id;
          break;
        }
      }
      if (!selectedTaskId) {
        throw new Error('Nenhua tarefa encontrada para o score desse usuario');
      }
      return this.create({userId: userId, taskId: selectedTaskId});
    } catch (error) {
      throw error;
    }
  }

  async createByQuestionScore(
    createUserTaskQuestScore: CreateUserTaskQuestScoreDto,
  ): Promise<UserTask> {
    try {
      const {userId, surveyId, taskIds, questionStatement} =
        createUserTaskQuestScore;
      const surveyAnswer =
        await this.surveyAnswerService.findByUserIdAndSurveyId(
          userId,
          surveyId,
        );
      if (!surveyAnswer) {
        throw new NotFoundException('SurveyAnswer nao foi encontrado');
      }
      const questionAnswer = surveyAnswer.answers.find(
        (answer) => answer.questionStatement === questionStatement,
      );
      if (!questionAnswer) {
        throw new NotFoundException('Questao não encontrada.');
      }
      const questionScore = questionAnswer.score;
      const taskList = await this.taskService.findMany(taskIds);
      let selectedTaskId;
      for (const task of taskList) {
        if (
          questionScore >= task.min_score &&
          questionScore <= task.max_score
        ) {
          selectedTaskId = task._id;
          break;
        }
      }
      if (!selectedTaskId) {
        throw new Error('Nenhuma task encontrada para o score desse usuario');
      }
      return this.create({userId: userId, taskId: selectedTaskId});
    } catch (error) {
      throw error;
    }
  }

  async createByAverageQuestionsScore(
    createUserTaskAvgQuestScore: CreateUserTaskAvgQuestScoreDto,
  ): Promise<UserTask> {
    try {
      const {userId, surveyId, taskIds, questionStatements} =
        createUserTaskAvgQuestScore;
      const surveyAnswer =
        await this.surveyAnswerService.findByUserIdAndSurveyId(
          userId,
          surveyId,
        );
      if (!surveyAnswer) {
        throw new NotFoundException('SurveyAnswer nao foi encontrado');
      }

      const selectedQuestion = surveyAnswer.answers.filter((answer) =>
        questionStatements.includes(answer.questionStatement),
      );
      if (selectedQuestion.length === 0) {
        throw new Error('Nenhuma das questoes foram encontradas.');
      }
      const totalScore = selectedQuestion.reduce(
        (acc, question) => acc + question.score,
        0,
      );
      const avgScore = totalScore / selectedQuestion.length;
      const taskList = await this.taskService.findMany(taskIds);
      let selectedTaskId;
      for (const task of taskList) {
        if (avgScore >= task.min_score && avgScore <= task.max_score) {
          selectedTaskId = task._id;
          break;
        }
      }
      if (!selectedTaskId) {
        throw new Error('Nenhuma task encontrada para o score do usuario');
      }

      return this.create({userId: userId, taskId: selectedTaskId});
    } catch (error) {
      throw error;
    }
  }

  //TODO Fazer destribuicao de carga
  async createRandom2(userId: string, taskIds: string[]): Promise<UserTask> {
    const randomIndex = Math.floor(Math.random() * taskIds.length);
    const selectTaskId = taskIds[randomIndex];

    return await this.create({userId: userId, taskId: selectTaskId});
  }

  async createRandom(
    createUserTaskRandomDto: CreateUserTaskRandomDto,
  ): Promise<UserTask> {
    try {
      const {userId, taskIds} = createUserTaskRandomDto;
      const taskCounts = await this.getTaskCounts(taskIds);

      const weights = taskIds.map((taskId) => {
        const count = taskCounts[taskId];
        return 1 / (count + 1);
      });

      const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
      const cumulativeWeights = weights.map(
        (w, i, arr) =>
          arr.slice(0, i + 1).reduce((sum, weight) => sum + weight, 0) /
          totalWeight,
      );

      const random = Math.random();
      let selectTaskId;
      for (let i = 0; i < cumulativeWeights.length; i++) {
        if (random <= cumulativeWeights[i]) {
          selectTaskId = taskIds[i];
          break;
        }
      }
      return await this.create({userId: userId, taskId: selectTaskId});
    } catch (error) {
      throw error;
    }
  }

  async createMany(userTasks: UserTask[]): Promise<UserTask[]> {
    try {
      const savedUserTasks = await this.userTaskRepository.save(userTasks);
      return savedUserTasks;
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<UserTask[]> {
    return await this.userTaskRepository.find();
  }
  async findByUserId(userId: string): Promise<UserTask[]> {
    return await this.userTaskRepository.find({
      where: {
        user: {_id: userId},
      },
    });
  }

  async findByTaskId(taskId: string): Promise<UserTask[]> {
    return await this.userTaskRepository.find({
      where: {
        task: {_id: taskId},
      },
    });
  }

  async findByUserIdAndTaskId(
    userId: string,
    taskId: string,
  ): Promise<UserTask> {
    return await this.userTaskRepository.findOne({
      where: {
        user: {_id: userId},
        task: {_id: taskId},
      },
    });
  }

  async removeByUserIdAndTaskId(
    userId: string,
    taskId: string,
  ): Promise<UserTask> {
    const result = this.findByUserIdAndTaskId(userId, taskId);
    await this.userTaskRepository.delete({
      user: {_id: userId},
      task: {_id: taskId},
    });
    return result;
  }

  async remove(id: string) {
    const result = this.userTaskRepository.findOne({
      where: {
        _id: id,
      },
    });
    await this.userTaskRepository.delete({_id: id});
    return result;
  }

  async update(
    id: string,
    updateUserTaskDto: UpdateUserTaskDto,
  ): Promise<UserTask> {
    await this.userTaskRepository.update({_id: id}, updateUserTaskDto);
    return await this.userTaskRepository.findOne({where: {_id: id}});
  }

  async start(
    id: string,
    timeEditUserTaskDTO: TimeEditUserTaskDto,
  ): Promise<UserTask> {
    let {isPaused, startTime} = timeEditUserTaskDTO;
    isPaused = false;
    startTime = new Date();
    await this.update(id, {isPaused, startTime});
    return await this.userTaskRepository.findOne({where: {_id: id}});
  }

  async pause(
    id: string,
    timeEditUserTaskDto: TimeEditUserTaskDto,
  ): Promise<UserTask> {
    let {isPaused, pauseTime} = timeEditUserTaskDto;
    isPaused = true;
    if (!pauseTime) {
      pauseTime = [];
    }
    pauseTime.push(new Date());
    return await this.update(id, {isPaused, pauseTime});
  }

  async resume(
    id: string,
    timeEditUserTaskDTO: TimeEditUserTaskDto,
  ): Promise<UserTask> {
    let {isPaused, resumeTime} = timeEditUserTaskDTO;
    isPaused = false;
    if (!resumeTime) {
      resumeTime = [];
    }
    resumeTime.push(new Date());
    return await this.update(id, {isPaused, resumeTime});
  }

  async finish(
    id: string,
    timeEditUserTaskDTO: TimeEditUserTaskDto,
  ): Promise<UserTask> {
    let {hasFinishedTask, endTime} = timeEditUserTaskDTO;
    hasFinishedTask = true;
    endTime = new Date();
    await this.update(id, {hasFinishedTask, endTime});
    return await this.userTaskRepository.findOne({where: {_id: id}});
  }

  private async getTaskCounts(
    taskIds: string[],
  ): Promise<Record<string, number>> {
    const counts: Record<string, number> = {};
    for (const taskId of taskIds) {
      counts[taskId] = await this.getTaskAssignmentCount(taskId);
    }
    return counts;
  }

  private async getTaskAssignmentCount(taskId: string): Promise<number> {
    const tasks = await this.findByTaskId(taskId);
    return tasks.length;
  }
}
