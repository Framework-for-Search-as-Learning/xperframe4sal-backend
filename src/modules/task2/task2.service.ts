import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Task} from './entities/task.entity';
import {In, Repository} from 'typeorm';
import {CreateTaskDto} from './dto/create-task.dto';
import {Experiments2Service} from '../experiments2/experiments2.service';
import {UpdateTaskDto} from './dto/update-task.dto';
import {Survey2Service} from '../survey2/survey2.service';
import {TaskQuestionMapService} from '../task-question-map/task-question-map.service';

@Injectable()
export class Task2Service {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @Inject(forwardRef(() => Experiments2Service))
    private readonly experimentService: Experiments2Service,
    private readonly surveyService: Survey2Service,
    @Inject(forwardRef(() => TaskQuestionMapService))
    private readonly taskQuestionMapService: TaskQuestionMapService,
  ) {}
  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    try {
      const {
        title,
        summary,
        description,
        experiment_id,
        survey_id,
        rule_type,
        min_score,
        max_score,
        questionsId,
      } = createTaskDto;

      const experiment = await this.experimentService.find(experiment_id);
      if (!experiment) {
        throw new NotFoundException('Experimento não encontrado');
      }
      let survey = null;
      if (survey_id) {
        survey = await this.surveyService.findOne(survey_id);
        if (!survey) {
          throw new NotFoundException('Survey não encontrado');
        }
      }
      console.log('Create TaskDto: ', createTaskDto);
      const newTask = await this.taskRepository.save({
        title,
        summary,
        description,
        experiment,
        survey,
        rule_type,
        min_score: min_score || 0,
        max_score: max_score || 0,
      });
      console.log(newTask);
      if (questionsId?.length > 0) {
        await Promise.all(
          questionsId.map((questionId) =>
            this.taskQuestionMapService.create(newTask._id, questionId),
          ),
        );
      }
      return await newTask;
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<Task[]> {
    return await this.taskRepository.find();
  }

  async findOne(id: string): Promise<Task> {
    return await this.taskRepository.findOneBy({_id: id});
  }

  async findMany(ids: string[]): Promise<Task[]> {
    return await this.taskRepository.find({
      where: {
        _id: In(ids),
      },
    });
  }

  async findByExperimentId(experimentId: string): Promise<Task[]> {
    return await this.taskRepository.find({
      where: {
        experiment: {_id: experimentId},
      },
    });
  }

  async findBySurveyId(surveyId: string): Promise<Task[]> {
    return await this.taskRepository.find({
      where: {
        survey_id: surveyId,
      },
    });
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const oldTask = await this.findOne(id);
    if (
      updateTaskDto.survey_id &&
      updateTaskDto?.survey_id !== oldTask.survey_id
    ) {
      const survey = await this.surveyService.findOne(updateTaskDto.survey_id);
      if (!survey) {
        throw new NotFoundException('Survey não encontrado');
      }
    }
    const questionsInTask =
      await this.taskQuestionMapService.findQuestionsByTask(id);
    //TODO verificar depois se essas duas listas vao ser passadas na mesma ordem
    if (questionsInTask !== updateTaskDto?.questionsId) {
      console.log('Passou aqui 666666666');
      console.log('updateQuestionsiId: ', updateTaskDto.questionsId);
      await this.taskQuestionMapService.updateTaskQuestionMap(
        id,
        updateTaskDto.questionsId,
      );
    }
    console.log('UpdateTaskDto: ', updateTaskDto);
    delete updateTaskDto.questionsId;
    await this.taskRepository.update({_id: id}, updateTaskDto);
    return await this.findOne(id);
  }

  async remove(id: string) {
    const task = await this.findOne(id);
    await this.taskRepository.delete({_id: id});
    return task;
  }
}
