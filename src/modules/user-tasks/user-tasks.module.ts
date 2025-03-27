import { Module } from '@nestjs/common';
import { UserTasksService } from './user-tasks.service';
import { UserTasksController } from './user-tasks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserTaskSchema } from 'src/model/user-task.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'UserTasks', schema: UserTaskSchema }])],
  controllers: [UserTasksController],
  providers: [UserTasksService],
  exports: [UserTasksService],
})
export class UserTasksModule { }
