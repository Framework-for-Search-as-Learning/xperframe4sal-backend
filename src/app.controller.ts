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
