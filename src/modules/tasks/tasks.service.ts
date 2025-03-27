import {Injectable} from '@nestjs/common';
import {Task} from '../../model/task.entity';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel('Task')
    private readonly _taskModel: Model<Task>,
  ) {}

  async create(task: Task): Promise<Task> {
    const newTask = new this._taskModel(task);
    return await newTask.save();
  }

  async findAll(): Promise<Task[]> {
    return await this._taskModel.find().exec();
  }

  async findOne(id: string): Promise<Task> {
    return await this._taskModel.findById(id).exec();
  }

  async update(id: string, task: Task): Promise<Task> {
    return await this._taskModel.findByIdAndUpdate(id, task, {
      new: true,
    });
  }

  async remove(id: string) {
    return await this._taskModel.findByIdAndDelete(id).exec();
  }
}
