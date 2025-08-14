import {Body, Controller, Get, Param, Patch, Post, Query} from '@nestjs/common';
import {SurveyAnswer2Service} from './survey-answer2.service';
import {CreateSurveyAnswerDto} from './dto/create-surveyAnswer.dto';
import {SurveyAnswer} from './entity/survey-answer.entity';
import {UpdateSurveyAnswerDto} from './dto/update-surveyAnswer.dto';

@Controller('survey-answer2')
export class SurveyAnswer2Controller {
  constructor(private readonly surveyAnswerService: SurveyAnswer2Service) {}

  @Post()
  async create(
    @Body() createSurveyAnswerDto: CreateSurveyAnswerDto,
  ): Promise<SurveyAnswer> {
    return await this.surveyAnswerService.create(createSurveyAnswerDto);
  }

  @Get()
  async findAll(
    @Query('userId') userId: string,
    @Query('surveyId') surveyId: string,
  ): Promise<SurveyAnswer[] | SurveyAnswer> {
    if (userId) {
      if (surveyId) {
        return await this.surveyAnswerService.findByUserIdAndSurveyId(
          userId,
          surveyId,
        );
      }
      return await this.surveyAnswerService.findByUserId(userId);
    }
    return await this.surveyAnswerService.findAll();
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSurveyAnswerDto: UpdateSurveyAnswerDto,
  ): Promise<SurveyAnswer> {
    return await this.surveyAnswerService.update(id, updateSurveyAnswerDto);
  }
}
