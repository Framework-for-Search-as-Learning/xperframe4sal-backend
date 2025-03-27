import {ApiProperty} from '@nestjs/swagger';
import {IsArray, IsNotEmpty, /*IsNumber,*/ IsString} from 'class-validator';

export class CreateUserTaskScoreDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  surveyId: string;

  @ApiProperty({type: [String]})
  @IsNotEmpty()
  @IsArray()
  @IsString({each: true})
  taskIds: string[];

  /*@ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  score: number;*/
}
