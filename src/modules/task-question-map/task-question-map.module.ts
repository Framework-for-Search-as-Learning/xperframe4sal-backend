import {Module} from '@nestjs/common';
import {TaskQuestionMapService} from './task-question-map.service';
import {TaskQuestionMapController} from './task-question-map.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {TaskQuestionMap} from './entity/taskQuestionMap.entity';
import {Task2Module} from '../task2/task2.module';

@Module({
  imports: [TypeOrmModule.forFeature([TaskQuestionMap]), Task2Module],
  providers: [TaskQuestionMapService],
  controllers: [TaskQuestionMapController],
  exports: [TaskQuestionMapService],
})
export class TaskQuestionMapModule {}
