import { Module } from '@nestjs/common';
import { SurveysService } from './surveys.service';
import { SurveysController } from './surveys.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SurveySchema } from 'src/model/survey.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Surveys', schema: SurveySchema }])],
  controllers: [SurveysController],
  providers: [SurveysService],
})
export class SurveysModule { }
