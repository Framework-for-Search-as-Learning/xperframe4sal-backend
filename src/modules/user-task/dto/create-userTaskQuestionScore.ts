import {IsArray, IsNotEmpty, IsString} from 'class-validator';

export class CreateUserTaskQuestScoreDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  surveyId: string;

  @IsNotEmpty()
  @IsArray()
  @IsString({each: true})
  taskIds: string[];

  @IsNotEmpty()
  @IsString()
  questionStatement: string;
}
