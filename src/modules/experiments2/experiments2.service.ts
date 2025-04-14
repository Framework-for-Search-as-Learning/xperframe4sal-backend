import {forwardRef, Inject, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Experiment} from './entity/experiment.entity';
import {Repository} from 'typeorm';
import {CreateExperimentDto} from './dto/create-experiment.dto';
//import {Task} from '../task2/entities/task.entity';
//import {UserExperiment} from '../user-experiments2/entities/user-experiments.entity';
import {UserExperiments2Service} from '../user-experiments2/user-experiments2.service';
import {UserTask2Service} from '../user-task2/user-task2.service';
import {UpdateExperimentDto} from './dto/update-experiment.dto';
import {User2Service} from '../user2/user2.service';
import {Task2Service} from '../task2/task2.service';
import {Survey2Service} from '../survey2/survey2.service';

@Injectable()
export class Experiments2Service {
  constructor(
    @InjectRepository(Experiment)
    private readonly experimentRepository: Repository<Experiment>,
    @Inject(forwardRef(() => UserExperiments2Service))
    private readonly userExperimentService: UserExperiments2Service,
    private readonly userTaskService: UserTask2Service,
    private readonly userService: User2Service,
    private readonly taskService: Task2Service,
    private readonly surveyService: Survey2Service,
  ) {}

  async create(createExperimentDto: CreateExperimentDto): Promise<any> {
    const {
      name,
      ownerId,
      summary,
      tasksProps,
      surveysProps,
      typeExperiment,
      betweenExperimentType,
    } = createExperimentDto;
    console.log('Survey Props:');
    console.log(surveysProps);
    const owner = await this.userService.findOne(ownerId);
    const experiment = await this.experimentRepository.create({
      name,
      summary,
      owner_id: ownerId,
      owner,
      typeExperiment,
      betweenExperimentType,
    });
    const savedExperiment = await this.experimentRepository.save(experiment);

    //Create Surveys
    const SurveysPromises = surveysProps.map((survey) => {
      return this.surveyService.create({
        description: survey.description,
        name: survey.name,
        title: survey.title,
        questions: survey.questions,
        type: survey.type,
        experimentId: survey.experimentId,
      });
    });
    await Promise.all(SurveysPromises);

    //Create Task
    const TasksPromises = tasksProps.map((task) => {
      return this.taskService.create({
        title: task.title,
        summary: task.summary,
        description: task.description,
        rule_type: task.RulesExperiment,
        minScore: task.ScoreThreshold,
        maxScore: task.ScoreThresholdmx,
        questionsId: task.questionsId,
        experimentId: savedExperiment._id,
      });
    });
    await Promise.all(TasksPromises);

    return savedExperiment;
  }

  async findAll(): Promise<Experiment[]> {
    return await this.experimentRepository.find();
  }

  async find(id: string): Promise<Experiment> {
    return await this.experimentRepository.findOneBy({_id: id});
  }

  async findOneByName(name: string): Promise<Experiment> {
    return await this.experimentRepository.findOneBy({name});
  }

  async update(
    id: string,
    updateExperimentDto: UpdateExperimentDto,
  ): Promise<Experiment> {
    try {
      await this.experimentRepository.update({_id: id}, updateExperimentDto);
      const result = await this.find(id);
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async remove(id: string) {
    const experiment = await this.find(id);
    await this.experimentRepository.delete({_id: id});
    return experiment;
  }
}
