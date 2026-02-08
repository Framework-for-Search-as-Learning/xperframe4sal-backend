/*
 * Copyright (c) 2026, marcelomachado
 * Licensed under The MIT License [see LICENSE for details]
 */

import {Controller, Get} from '@nestjs/common';
import {ApiExcludeController} from '@nestjs/swagger';

@ApiExcludeController()
@Controller()
export class AppController {
  constructor() {}

  @Get()
  getHello(): string {
    return 'Working!';
  }
}
