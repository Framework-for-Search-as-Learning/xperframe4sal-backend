import { Module } from '@nestjs/common';
import { UserSurveysService } from './survey-answers.service';
import { UserSurveysController } from './survey-answers.controller';
import { UserSurveySchema } from 'src/model/survey-answer.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'SurveyAnswers', schema: UserSurveySchema }])],
  controllers: [UserSurveysController],
  providers: [UserSurveysService],
})
export class UserSurveysModule { }
