import { Module } from '@nestjs/common';
import { UserExperimentsService } from './user-experiments.service';
import { UserExperimentsController } from './user-experiments.controller';
import { UserExperimentSchema } from 'src/model/user-experiment.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { UserTasksModule } from '../user-tasks/user-tasks.module';
import { ExperimentsModule } from '../experiments/experiments.module';

@Module({
  imports: [
    UserTasksModule,
    ExperimentsModule,
    MongooseModule.forFeature([{ name: 'UserExperiments', schema: UserExperimentSchema }])],
  controllers: [UserExperimentsController],
  providers: [UserExperimentsService],
  exports: [UserExperimentsService],
})
export class UserExperimentsModule { }
