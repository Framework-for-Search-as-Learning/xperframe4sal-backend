import {ApiProperty} from '@nestjs/swagger';
//import {Type} from 'class-transformer';
import {
  /*IsArray*/ IsNumber,
  IsString /*ValidateNested*/,
} from 'class-validator';
//import {QuestionDTO} from './question.dto';

export class OptionDTO {
  @ApiProperty()
  @IsString()
  statement: string;

  @ApiProperty()
  @IsNumber()
  score: number;

  /* @ApiProperty({type: [QuestionDTO]})
  @IsArray()
  @ValidateNested({each: true})
  @Type(() => QuestionDTO)
  subQuestion: QuestionDTO[];

  @ApiProperty()
  @IsString()
  type: string;

  @ApiProperty()
  @IsString()
  functionName: string;*/
}
