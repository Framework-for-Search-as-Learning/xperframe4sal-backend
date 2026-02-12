/*
 * Copyright (c) 2026, lapic-ufjf
 * Licensed under The MIT License [see LICENSE for details]
 */

import {PartialType} from '@nestjs/swagger';
import {CreateExperimentDto} from './create-experiment.dto';

export class UpdateExperimentDto extends PartialType(CreateExperimentDto) {}
