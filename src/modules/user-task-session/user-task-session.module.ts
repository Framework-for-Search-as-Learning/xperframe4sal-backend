import { Module } from '@nestjs/common';
import { UserTaskSessionService } from './user-task-session.service';
import { UserTaskSessionController } from './user-task-session.controller';
import { UserTaskSessionSchema } from 'src/model/user-task-session.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'UserTaskSession', schema: UserTaskSessionSchema }])],
  controllers: [UserTaskSessionController],
  providers: [UserTaskSessionService],
  exports: [UserTaskSessionService],
})
export class UserTaskSessionModule { }
