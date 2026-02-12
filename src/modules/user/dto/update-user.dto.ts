/*
 * Copyright (c) 2026, lapic-ufjf
 * Licensed under The MIT License [see LICENSE for details]
 */

import {PartialType} from '@nestjs/swagger';
import {CreateUserDto} from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
