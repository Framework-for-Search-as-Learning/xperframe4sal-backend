import {Module} from '@nestjs/common';
import {TaskQuestionMapService} from './task-question-map.service';
import {TaskQuestionMapController} from './task-question-map.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {TaskQuestionMap} from './entity/taskQuestionMap.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskQuestionMap])],
  providers: [TaskQuestionMapService],
  controllers: [TaskQuestionMapController],
})
export class TaskQuestionMapModule {}
