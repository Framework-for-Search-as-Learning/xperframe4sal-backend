import {forwardRef, Module} from '@nestjs/common';
import {UserTask2Service} from './user-task2.service';
import {UserTask2Controller} from './user-task2.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserTask} from './entities/user-tasks.entity';
import {User2Module} from '../user2/user2.module';
import {Task2Module} from '../task2/task2.module';
import {TaskQuestionMapModule} from '../task-question-map/task-question-map.module';
import { UserTaskSession2Module } from '../user-task-session2/user-task-session2.module';
import { LlmSessionModule } from 'src/llm-session/llm-session.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserTask]),
    forwardRef(() => Task2Module),
    User2Module,
    TaskQuestionMapModule,
    forwardRef(() => UserTaskSession2Module),
    forwardRef(() => LlmSessionModule)
  ],
  providers: [UserTask2Service],
  controllers: [UserTask2Controller],
  exports: [UserTask2Service],
})
export class UserTask2Module {}
