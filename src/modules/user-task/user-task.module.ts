import { forwardRef, Module } from '@nestjs/common';
import { UserTaskService } from './user-task.service';
import { UserTaskController } from './user-task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTask } from './entities/user-tasks.entity';
import { UserModule } from '../user/user.module';
import { TaskModule } from '../task/task.module';
import { TaskQuestionMapModule } from '../task-question-map/task-question-map.module';
import { UserTaskSessionModule } from '../user-task-session/user-task-session.module';
import { LlmSessionModule } from 'src/modules/llm-session/llm-session.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserTask]),
    forwardRef(() => TaskModule),
    UserModule,
    TaskQuestionMapModule,
    forwardRef(() => UserTaskSessionModule),
    forwardRef(() => LlmSessionModule)
  ],
  providers: [UserTaskService],
  controllers: [UserTaskController],
  exports: [UserTaskService],
})
export class UserTaskModule { }
