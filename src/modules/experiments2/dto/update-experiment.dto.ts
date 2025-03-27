import {PartialType} from '@nestjs/swagger';
import {CreateExperimentDto} from './create-experiment.dto';

export class UpdateExperimentDto extends PartialType(CreateExperimentDto) {}
