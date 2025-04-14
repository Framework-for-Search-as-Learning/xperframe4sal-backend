import {ApiProperty} from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTaskDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  summary: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  experimentId: string;

  @IsOptional()
  @IsString()
  surveyId?: string;

  @IsOptional()
  @IsString()
  rule_type?: string; //score || question

  @IsOptional()
  @IsArray()
  questionsId?: number[];

  @IsOptional()
  @IsNumber()
  minScore?: number;

  @IsOptional()
  @IsNumber()
  maxScore?: number;
}
