import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {Repository} from 'typeorm';
import {TaskQuestionMap} from './entity/taskQuestionMap.entity';
import {Task2Service} from '../task2/task2.service';
import {InjectRepository} from '@nestjs/typeorm';

@Injectable()
export class TaskQuestionMapService {
  constructor(
    @InjectRepository(TaskQuestionMap)
    private readonly taskQuestionMapRepository: Repository<TaskQuestionMap>,
    @Inject(forwardRef(() => Task2Service))
    private readonly taskService: Task2Service,
  ) {}

  async create(taskId: string, questionId: string): Promise<TaskQuestionMap> {
    const task = await this.taskService.findOne(taskId);
    if (!task) {
      throw new NotFoundException('Task não encontrada.');
    }
    return await this.taskQuestionMapRepository.save({
      task,
      question_id: questionId,
    });
  }

  async findQuestionsByTask(taskId: string): Promise<string[]> {
    const taskquestions = await this.taskQuestionMapRepository.find({
      where: {task_id: taskId},
    });
    const questionsIds = taskquestions.map(
      (taskQuestion) => taskQuestion.question_id,
    );
    return questionsIds;
  }
}
