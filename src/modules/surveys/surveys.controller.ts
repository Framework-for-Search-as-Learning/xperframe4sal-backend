import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {SurveysService} from './surveys.service';
import {Survey} from 'src/model/survey.entity';
import {AuthGuard} from '@nestjs/passport';
import {ApiExcludeController} from '@nestjs/swagger';

@ApiExcludeController()
@Controller('surveys')
export class SurveysController {
  constructor(private readonly surveysService: SurveysService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() survey: Survey): Promise<Survey> {
    return await this.surveysService.create(survey);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(): Promise<Survey[]> {
    return await this.surveysService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Survey> {
    return this.surveysService.find(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() survey: Survey,
  ): Promise<Survey> {
    survey.lastChangedAt = new Date();
    return await this.surveysService.update(id, survey);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.surveysService.remove(id);
  }
}
