import {IsArray, IsNotEmpty, /*IsNumber,*/ IsString} from 'class-validator';
import {SurveyAnswer} from 'src/modules/survey-answer2/entity/survey-answer.entity';

export class CreateUserTaskScoreDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsArray()
  @IsString({each: true})
  taskIds: string[];

  @IsNotEmpty()
  surveyAnswer: SurveyAnswer;

  /*@ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  score: number;*/
}
