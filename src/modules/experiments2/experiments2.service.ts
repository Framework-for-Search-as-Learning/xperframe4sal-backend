import {forwardRef, Inject, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Experiment, StepsType} from './entity/experiment.entity';
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
import {Icf2Service} from '../icf2/icf2.service';

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
    @Inject(forwardRef(() => Icf2Service))
    private readonly icfService: Icf2Service,
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
      icf,
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
        uuid: survey.uuid,
      });
    });
    await Promise.all(SurveysPromises);

    //Create Task
    const TasksPromises = tasksProps.map((task) => {
      return this.taskService.create({
        title: task.title,
        summary: task.summary,
        description: task.description,
        survey_id: task.SelectedSurvey,
        rule_type: task.RulesExperiment,
        min_score: task.ScoreThreshold,
        max_score: task.ScoreThresholdmx,
        questionsId: task.selectedQuestionIds,
        experiment_id: savedExperiment._id,
      });
    });
    await Promise.all(TasksPromises);

    //Create Icf
    await this.icfService.create({
      title: icf.title,
      description: icf.description,
      experimentId: savedExperiment._id,
    });
    return savedExperiment;
  }

  async findAll(): Promise<Experiment[]> {
    return await this.experimentRepository.find();
  }

  async find(id: string): Promise<Experiment> {
    return await this.experimentRepository.findOneBy({_id: id});
  }

  async findWithTasks(id: string): Promise<Experiment> {
    return await this.experimentRepository.findOne({
      where: {_id: id},
      relations: ['tasks'],
    });
  }

  async findOneByName(name: string): Promise<Experiment> {
    return await this.experimentRepository.findOneBy({name});
  }

  async findByOwnerId(ownerId: string): Promise<Experiment[]> {
    return await this.experimentRepository.find({where: {owner_id: ownerId}});
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

  async buildStep(experimentId: string): Promise<Record<StepsType, any>> {
    const experiment = await this.experimentRepository.findOne({
      where: {_id: experimentId},
      relations: ['tasks', 'surveys', 'icfs'],
    });
    const step: Record<StepsType, any> = {
      [StepsType.ICF]: undefined,
      [StepsType.PRE]: undefined,
      [StepsType.POST]: undefined,
      [StepsType.TASK]: undefined,
    };
    if (experiment.icfs && experiment.icfs.length > 0) {
      step[StepsType.ICF] = {label: 'Aceitar termo de consentimento', order: 1};
    }

    if (experiment.tasks && experiment.tasks.length > 0) {
      step[StepsType.TASK] = {label: 'Finalizar tarefas de busca', order: 3};
    }
    if (experiment.surveys.length > 0) {
      let hasPre = false;
      let hasPost = false;
      for (const survey of experiment.surveys) {
        if (survey.type == 'pre') {
          hasPre = true;
        }
        if (survey.type == 'post') {
          hasPost = true;
        }
      }
      if (hasPre) {
        step[StepsType.PRE] = {label: 'Responder Pre-Questionarios', order: 2};
      }
      if (hasPost) {
        step[StepsType.POST] = {label: 'Responder Pos-Questionarios', order: 4};
      }
    }
    return step;
  }
}
