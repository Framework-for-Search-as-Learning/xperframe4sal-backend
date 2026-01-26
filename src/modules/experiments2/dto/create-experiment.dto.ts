//import {UserProps} from 'src/model/experiment.entity';
import {IsNotEmpty, IsOptional, IsString} from 'class-validator';
import {TaskProps} from '../entity/experiment.entity';
import {CreateSurveyDto} from 'src/modules/survey2/dto/create-survey.dto';
import {ApiProperty} from '@nestjs/swagger';

export class CreateExperimentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  ownerId: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  summary: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  typeExperiment: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  betweenExperimentType: string;

 

  //Ver como fazer a relação
  //tasks: Task[];
  tasksProps: TaskProps[];
  //;userProps: string[];
  surveysProps: CreateSurveyDto[];

  icf: {title: string; description: string};

  
}
