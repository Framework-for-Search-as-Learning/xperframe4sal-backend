/*
 * Copyright (c) 2026, marcelomachado
 * Licensed under The MIT License [see LICENSE for details]
 */

import {PartialType} from '@nestjs/swagger';
import {CreateIcfDto} from './create-icf.dto';

export class UpdateIcfDto extends PartialType(CreateIcfDto) {}
