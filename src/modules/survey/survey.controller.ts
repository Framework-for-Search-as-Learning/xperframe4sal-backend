import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SurveyService } from './survey.service';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { Survey } from './entity/survey.entity';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { SurveyStatsDto } from './dto/survey-stats.dto';

@ApiTags('Survey')
@Controller('survey')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) { }

  @Post()
  @ApiOperation({ summary: 'Create a survey' })
  @ApiBody({ type: CreateSurveyDto })
  @ApiResponse({ status: 201, description: 'Survey created successfully.' })
  async create(@Body() createSurveyDto: CreateSurveyDto): Promise<Survey> {
    return await this.surveyService.create(createSurveyDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all surveys' })
  @ApiResponse({ status: 200, description: 'List of surveys.' })
  async findAll(): Promise<Survey[]> {
    return await this.surveyService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a survey by id' })
  @ApiParam({ name: 'id', type: String, description: 'Survey ID' })
  @ApiResponse({ status: 200, description: 'Survey details.' })
  @ApiResponse({ status: 404, description: 'Survey not found.' })
  async findOne(@Param('id') id: string): Promise<Survey> {
    return await this.surveyService.findOne(id);
  }

  @Get('/experiment/:experimentId')
  @ApiOperation({ summary: 'Get surveys by experiment id' })
  @ApiParam({ name: 'experimentId', type: String, description: 'Experiment ID' })
  @ApiResponse({ status: 200, description: 'Surveys linked to the experiment.' })
  async findByExperimentId(
    @Param('experimentId') experimentId: string,
  ): Promise<Survey[]> {
    return await this.surveyService.findByExperimentId(experimentId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a survey by id' })
  @ApiParam({ name: 'id', type: String, description: 'Survey ID' })
  @ApiBody({ type: UpdateSurveyDto })
  @ApiResponse({ status: 200, description: 'Survey updated successfully.' })
  async update(
    @Param('id') id: string,
    @Body() updateSurveyDto: UpdateSurveyDto,
  ): Promise<Survey> {
    return await this.surveyService.update(id, updateSurveyDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a survey by id' })
  @ApiParam({ name: 'id', type: String, description: 'Survey ID' })
  @ApiResponse({ status: 200, description: 'Survey deleted successfully.' })
  async remove(@Param('id') id: string) {
    return await this.surveyService.remove(id);
  }

  @Get(':id/stats')
  @ApiOperation({ summary: 'Get survey statistics' })
  @ApiParam({ name: 'id', type: String, description: 'Survey ID' })
  @ApiResponse({ status: 200, description: 'Survey statistics.' })
  async getStats(@Param('id') id: string): Promise<SurveyStatsDto> {
    return await this.surveyService.getStats(id);
  }
}
