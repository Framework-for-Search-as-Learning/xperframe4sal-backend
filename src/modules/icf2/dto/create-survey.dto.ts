import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsString} from 'class-validator';

export class CreateIcfDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  researchTitle: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  agreementStatement: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  icfText: string;

  //TODO esperar resolver no banco
  //researchers

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  contact: string;
}
