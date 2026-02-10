import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { QuestionType } from 'src/modules/survey/dto/question.dto';

export class AnswerOptionsDTO {
  @IsString()
  statement: string;

  @IsNumber()
  score: number;
}

export class AnswerDTO {
  @IsString()
  id: string;

  @IsString()
  questionStatement: string;

  @IsEnum(QuestionType)
  questionType: QuestionType;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnswerOptionsDTO)
  @IsOptional()
  selectedOptions?: AnswerOptionsDTO[];

  @IsString()
  @IsOptional()
  textAnswer?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnswerDTO)
  @IsOptional()
  subAnswer?: AnswerDTO[];

  @IsOptional()
  @IsNumber()
  score?: number = 0;
}
