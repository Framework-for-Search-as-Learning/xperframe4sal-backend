import {Module} from '@nestjs/common';
import {UserTaskSession2Service} from './user-task-session2.service';
import {UserTaskSession2Controller} from './user-task-session2.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserTaskSession} from './entities/user-task-session.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserTaskSession])],
  providers: [UserTaskSession2Service],
  controllers: [UserTaskSession2Controller],
})
export class UserTaskSession2Module {}
