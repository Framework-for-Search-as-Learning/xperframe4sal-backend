//import {StepsType} from 'src/modules/experiments2/entity/experiment.entity';

import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsString} from 'class-validator';

export class CreateUserExperimentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  experimentId: string;
  //stepsCompleted: Record<StepsType, boolean>;
}
