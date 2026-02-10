import {PartialType} from '@nestjs/swagger';
import {CreateUserExperimentDto} from './create-userExperiment.dto';

export class UpdateUserExperimentDto extends PartialType(
  CreateUserExperimentDto,
) {}
