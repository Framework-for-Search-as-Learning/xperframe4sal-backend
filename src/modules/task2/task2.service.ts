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
        experimentId,
        surveyId,
        rule_type,
        minScore,
        maxScore,
        questionsId,
      } = createTaskDto;

      const experiment = await this.experimentService.find(experimentId);
      if (!experiment) {
        throw new NotFoundException('Experimento não encontrado');
      }
      let survey = null;
      if (surveyId) {
        survey = await this.surveyService.findOne(surveyId);
        if (!survey) {
          throw new NotFoundException('Survey não encontrado');
        }
      }
      const newTask = await this.taskRepository.save({
        title,
        summary,
        description,
        experiment,
        survey,
        rule_type,
        min_score: minScore || 0,
        max_score: maxScore || 0,
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
    await this.taskRepository.update({_id: id}, updateTaskDto);
    return await this.findOne(id);
  }

  async remove(id: string) {
    const task = await this.findOne(id);
    await this.taskRepository.delete({_id: id});
    return task;
  }
}
