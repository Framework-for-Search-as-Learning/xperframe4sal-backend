import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {ApiOperation, ApiTags, ApiBody} from '@nestjs/swagger';
import {Survey2Service} from './survey2.service';
import {CreateSurveyDto} from './dto/create-survey.dto';
import {Survey} from './entity/survey.entity';
import {UpdateSurveyDto} from './dto/update-survey.dto';

@ApiTags('survey2')
@Controller('survey2')
export class Survey2Controller {
  constructor(private readonly surveyService: Survey2Service) {}

  @Post()
  @ApiOperation({summary: 'Create a survey'})
  @ApiBody({type: CreateSurveyDto})
  async create(@Body() createSurveyDto: CreateSurveyDto): Promise<Survey> {
    return await this.surveyService.create(createSurveyDto);
  }

  @Get()
  @ApiOperation({summary: 'Get all surveys'})
  async findAll(): Promise<Survey[]> {
    return await this.surveyService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary: 'Get a survey by id'})
  async findOne(@Param('id') id: string): Promise<Survey> {
    return await this.surveyService.findOne(id);
  }

  @Get('/experiment/:experimentId')
  @ApiOperation({summary: 'Get surveys by experiment id'})
  async findByExperimentId(
    @Param('experimentId') experimentId: string,
  ): Promise<Survey[]> {
    return await this.surveyService.findByExperimentId(experimentId);
  }

  @Patch(':id')
  @ApiOperation({summary: 'Update a survey by id'})
  @ApiBody({type: UpdateSurveyDto})
  async update(
    @Param('id') id: string,
    @Body() updateSurveyDto: UpdateSurveyDto,
  ): Promise<Survey> {
    return await this.surveyService.update(id, updateSurveyDto);
  }

  @Delete(':id')
  @ApiOperation({summary: 'Delete a survey by id'})
  async remove(@Param('id') id: string) {
    return await this.surveyService.remove(id);
  }
}
