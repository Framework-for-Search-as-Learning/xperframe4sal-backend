import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { SurveyAnswer } from 'src/modules/survey-answer/entity/survey-answer.entity';

export class CreateUserTaskAvgQuestScoreDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  surveyAnswer: SurveyAnswer;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  taskIds: string[];

  @IsNotEmpty()
  @IsArray()
  questionsIds: string[];
}
