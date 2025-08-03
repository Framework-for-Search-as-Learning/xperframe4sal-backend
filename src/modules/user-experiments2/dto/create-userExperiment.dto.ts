//import {StepsType} from 'src/modules/experiments2/entity/experiment.entity';

import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsObject, IsOptional, IsString} from 'class-validator';
import {StepsType} from 'src/modules/experiments2/entity/experiment.entity';

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
  stepsCompleted: Record<StepsType, boolean>;
}
