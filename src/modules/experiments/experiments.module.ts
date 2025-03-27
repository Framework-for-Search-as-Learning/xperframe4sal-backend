import { Module } from '@nestjs/common';
import { ExperimentsService } from './experiments.service';
import { ExperimentsController } from './experiments.controller';
import { ExperimentSchema } from '../../model/experiment.entity';
import { UserExperimentSchema } from '../../model/user-experiment.entity';
import { UserTaskSchema } from '../../model/user-task.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "Experiments", schema: ExperimentSchema },
      { name: "UserExperiment", schema: UserExperimentSchema },
      { name: "UserTask", schema: UserTaskSchema }
    ]),
  ],
  controllers: [ExperimentsController],
  providers: [ExperimentsService],
  exports: [ExperimentsService],
})
export class ExperimentsModule { }
