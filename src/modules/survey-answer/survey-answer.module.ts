import { forwardRef, Module } from '@nestjs/common';
import { SurveyAnswerService } from './survey-answer.service';
import { SurveyAnswerController } from './survey-answer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyAnswer } from './entity/survey-answer.entity';
import { UserModule } from '../user/user.module';
import { SurveyModule } from '../survey/survey.module';
import { UserTaskModule } from '../user-task/user-task.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SurveyAnswer]),
    UserModule,
    forwardRef(() => SurveyModule),
    UserTaskModule,
  ],
  providers: [SurveyAnswerService],
  controllers: [SurveyAnswerController],
  exports: [SurveyAnswerService],
})
export class SurveyAnswerModule { }
