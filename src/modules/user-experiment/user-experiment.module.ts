import { forwardRef, Module } from '@nestjs/common';
import { UserExperimentService } from './user-experiment.service';
import { UserExperimentController } from './user-experiment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserExperiment } from './entities/user-experiments.entity';
import { UserModule } from '../user/user.module';
import { ExperimentModule } from '../experiment/experiment.module';
import { UserTaskModule } from '../user-task/user-task.module';
import { TaskModule } from '../task/task.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserExperiment]),
    UserModule,
    forwardRef(() => ExperimentModule),
    UserTaskModule,
    forwardRef(() => TaskModule),
  ],
  providers: [UserExperimentService],
  controllers: [UserExperimentController],
  exports: [UserExperimentService],
})
export class UserExperimentModule { }
