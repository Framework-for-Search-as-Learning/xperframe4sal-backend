import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {ApiOperation, ApiTags, ApiBody} from '@nestjs/swagger';
import {Task2Service} from './task2.service';
import {Task} from './entities/task.entity';
import {CreateTaskDto} from './dto/create-task.dto';
import {UpdateTaskDto} from './dto/update-task.dto';

@ApiTags('task2')
@Controller('task2')
export class Task2Controller {
  constructor(private readonly taskService: Task2Service) {}

  @Post()
  @ApiOperation({summary: 'Create a task'})
  @ApiBody({type: CreateTaskDto})
  async create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return await this.taskService.create(createTaskDto);
  }

  @Get()
  @ApiOperation({summary: 'Get all tasks'})
  async findAll(): Promise<Task[]> {
    return await this.taskService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary: 'Get a task by id'})
  async findOne(@Param('id') id: string): Promise<Task> {
    return await this.taskService.findOne(id);
  }

  @Get('/experiment/:experimentId')
  @ApiOperation({summary: 'Get tasks by experiment id'})
  async findByExperimentId(
    @Param('experimentId') experimentId: string,
  ): Promise<Task[]> {
    return await this.taskService.findByExperimentId(experimentId);
  }

  @Patch(':id')
  @ApiOperation({summary: 'Update a task by id'})
  @ApiBody({type: UpdateTaskDto})
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return await this.taskService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @ApiOperation({summary: 'Delete a task by id'})
  async remove(@Param('id') id: string) {
    return await this.taskService.remove(id);
  }
}
