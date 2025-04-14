import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsString} from 'class-validator';

export class CreateUserTaskRandomDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  surveyId: string;

  /*
  @ApiProperty({type: [String]})
  @IsNotEmpty()
  @IsArray()
  @IsString({each: true})
  taskIds: string[];
  */
}
