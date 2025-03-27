import {Module} from '@nestjs/common';
import {SurveyAnswer2Service} from './survey-answer2.service';
import {SurveyAnswer2Controller} from './survey-answer2.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {SurveyAnswer} from './entity/survey-answer.entity';
import {User2Module} from '../user2/user2.module';
import {Survey2Module} from '../survey2/survey2.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SurveyAnswer]),
    User2Module,
    Survey2Module,
  ],
  providers: [SurveyAnswer2Service],
  controllers: [SurveyAnswer2Controller],
  exports: [SurveyAnswer2Service],
})
export class SurveyAnswer2Module {}
