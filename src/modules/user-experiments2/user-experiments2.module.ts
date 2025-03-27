import {forwardRef, Module} from '@nestjs/common';
import {UserExperiments2Service} from './user-experiments2.service';
import {UserExperiments2Controller} from './user-experiments2.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserExperiment} from './entities/user-experiments.entity';
import {User2Module} from '../user2/user2.module';
import {Experiments2Module} from '../experiments2/experiments2.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserExperiment]),
    User2Module,
    forwardRef(() => Experiments2Module),
  ],
  providers: [UserExperiments2Service],
  controllers: [UserExperiments2Controller],
  exports: [UserExperiments2Service],
})
export class UserExperiments2Module {}
