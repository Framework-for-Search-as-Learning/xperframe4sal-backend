import {forwardRef, Module} from '@nestjs/common';
import {UserExperiments2Service} from './user-experiments2.service';
import {UserExperiments2Controller} from './user-experiments2.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserExperiment} from './entities/user-experiments.entity';
import {User2Module} from '../user2/user2.module';
import {Experiments2Module} from '../experiments2/experiments2.module';
import {UserTask2Module} from '../user-task2/user-task2.module';
import {Task2Module} from '../task2/task2.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserExperiment]),
    User2Module,
    forwardRef(() => Experiments2Module),
    UserTask2Module,
    Task2Module,
  ],
  providers: [UserExperiments2Service],
  controllers: [UserExperiments2Controller],
  exports: [UserExperiments2Service],
})
export class UserExperiments2Module {}
