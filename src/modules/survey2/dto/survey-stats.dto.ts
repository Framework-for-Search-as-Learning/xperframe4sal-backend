import { ApiProperty } from '@nestjs/swagger';
import { SurveyType } from '../entity/survey.entity';

export class SurveyQuestionStatOptionDto {
  @ApiProperty()
  statement: string;

  @ApiProperty()
  count: number;

  @ApiProperty()
  percentage: number;
}

export class SurveyQuestionStatDto {
  @ApiProperty()
  statement: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  totalAnswers: number;

  @ApiProperty({ type: [SurveyQuestionStatOptionDto] })
  options: SurveyQuestionStatOptionDto[];
}

export class SurveyStatsDto {
  @ApiProperty()
  surveyId: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ enum: SurveyType })
  type: SurveyType;

  @ApiProperty({ type: [SurveyQuestionStatDto] })
  questions: SurveyQuestionStatDto[];
}
