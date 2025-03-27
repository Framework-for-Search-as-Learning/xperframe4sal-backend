import { Controller, Get, Post, Body, Delete, Query, Patch, Param, UseGuards } from '@nestjs/common';
import { UserSurveysService } from './survey-answers.service';
import { SurveyAnswers } from 'src/model/survey-answer.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('survey-answers')
export class UserSurveysController {
  constructor(private readonly surveyAnswersService: UserSurveysService) { }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() surveyAnswer: SurveyAnswers): Promise<SurveyAnswers> {
    return await this.surveyAnswersService.create(surveyAnswer);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(
    @Query('userId') userId: string,
    @Query('surveyId') surveyId: string,
  ): Promise<SurveyAnswers[]> {
    if (userId) {
      if (surveyId) {
        return await this.surveyAnswersService.findByUserIdAndSurveyId(userId, surveyId);
      }
      return await this.surveyAnswersService.findByUserId(userId);
    }
    return await this.surveyAnswersService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() surveyAnswer: SurveyAnswers,
  ): Promise<SurveyAnswers> {
    surveyAnswer.lastChangedAt = new Date();
    return await this.surveyAnswersService.update(id, surveyAnswer);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete()
  async removeByUserIdAndSurveyId(
    @Query('userId') userId: string,
    @Query('surveyId') surveyId: string
  ) {
    if (userId) {
      if (surveyId) {
        return await this.surveyAnswersService.removeByUserIdAndSurveyId(userId, surveyId);
      }
    }
    return null;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(
    @Param('id') id: string,
  ) {
    return await this.surveyAnswersService.remove(id);
  }
}
