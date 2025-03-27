import {Body, Controller, Post} from '@nestjs/common';
import {SurveyAnswer2Service} from './survey-answer2.service';
import {CreateSurveyAnswerDto} from './dto/create-surveyAnswer.dto';
import {SurveyAnswer} from './entity/survey-answer.entity';

@Controller('survey-answer2')
export class SurveyAnswer2Controller {
  constructor(private readonly surveyAnswerService: SurveyAnswer2Service) {}

  @Post()
  async create(
    @Body() createSurveyAnswerDto: CreateSurveyAnswerDto,
  ): Promise<SurveyAnswer> {
    return await this.surveyAnswerService.create(createSurveyAnswerDto);
  }
}
