import {forwardRef, Module} from '@nestjs/common';
import {Experiments2Service} from './experiments2.service';
import {Experiments2Controller} from './experiments2.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Experiment} from './entity/experiment.entity';
import {UserExperiments2Module} from '../user-experiments2/user-experiments2.module';
import {UserTask2Module} from '../user-task2/user-task2.module';
import {User2Module} from '../user2/user2.module';
import {Task2Module} from '../task2/task2.module';
import {Survey2Module} from '../survey2/survey2.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Experiment]),
    forwardRef(() => UserExperiments2Module),
    UserTask2Module,
    User2Module,
    Task2Module,
    Survey2Module,
  ],
  providers: [Experiments2Service],
  controllers: [Experiments2Controller],
  exports: [Experiments2Service],
})
export class Experiments2Module {}
