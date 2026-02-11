import { ApiProperty } from '@nestjs/swagger';
//import {Type} from 'class-transformer';
import {
  /*IsArray*/ IsNumber,
  IsString /*ValidateNested*/,
} from 'class-validator';
//import {QuestionDTO} from './question.dto';

export class OptionDTO {
  @ApiProperty({ description: 'Option statement', example: 'Strongly agree' })
  @IsString()
  statement: string;

  @ApiProperty({ description: 'Score assigned to the option', example: 5 })
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
