import {IsArray, IsNotEmpty, IsString} from 'class-validator';

export class CreateUserTaskAvgQuestScoreDto {
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
  @IsArray()
  @IsString({each: true})
  questionStatements: string[];
}
