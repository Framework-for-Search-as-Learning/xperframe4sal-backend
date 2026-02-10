import { forwardRef, Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExperimentModule } from '../experiment/experiment.module';
import { SurveyModule } from '../survey/survey.module';
import { TaskQuestionMapModule } from '../task-question-map/task-question-map.module';
import { Task } from './entities/task.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    forwardRef(() => ExperimentModule),
    SurveyModule,
    forwardRef(() => TaskQuestionMapModule),
  ],
  providers: [TaskService],
  controllers: [TaskController],
  exports: [TaskService],
})
export class TaskModule { }
