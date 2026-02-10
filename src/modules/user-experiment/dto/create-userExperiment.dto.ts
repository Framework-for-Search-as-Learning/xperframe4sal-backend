//import {StepsType} from 'src/modules/experiments2/entity/experiment.entity';

import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';
import { StepsType } from 'src/modules/experiment/entity/experiment.entity';
import { UserExperimentStatus } from '../entities/user-experiments.entity';

export class CreateUserExperimentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  experimentId: string;

  @ApiProperty()
  @IsOptional()
  @IsObject()
  stepsCompleted?: Record<StepsType, boolean>;

  @ApiProperty({ enum: UserExperimentStatus })
  @IsOptional()
  @IsEnum(UserExperimentStatus)
  status?: UserExperimentStatus;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  startDate?: Date;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  completionDate?: Date;
}
