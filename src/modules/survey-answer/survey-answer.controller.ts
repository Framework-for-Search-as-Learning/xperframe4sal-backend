import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { SurveyAnswerService } from './survey-answer.service';
import { CreateSurveyAnswerDto } from './dto/create-surveyAnswer.dto';
import { SurveyAnswer } from './entity/survey-answer.entity';
import { UpdateSurveyAnswerDto } from './dto/update-surveyAnswer.dto';

@Controller('survey-answer')
export class SurveyAnswerController {
  constructor(private readonly surveyAnswerService: SurveyAnswerService) { }

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

  @Get('/user/:userId/survey/:surveyId')
  async findByUserIdAndSurveyId(
    @Param('userId') userId: string,
    @Param('surveyId') surveyId: string,
  ): Promise<SurveyAnswer> {
    return await this.surveyAnswerService.findByUserIdAndSurveyId(
      userId,
      surveyId,
    );
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSurveyAnswerDto: UpdateSurveyAnswerDto,
  ): Promise<SurveyAnswer> {
    return await this.surveyAnswerService.update(id, updateSurveyAnswerDto);
  }
}
