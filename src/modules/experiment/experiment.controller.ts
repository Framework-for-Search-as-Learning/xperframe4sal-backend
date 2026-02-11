import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
  Header,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiProduces,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { ExperimentService } from './experiment.service';
import { Experiment } from './entity/experiment.entity';
import { CreateExperimentDto } from './dto/create-experiment.dto';
import { UpdateExperimentDto } from './dto/update-experiment.dto';

import { ExperimentStatsDto } from './dto/experiment-stats.dto';
import { ExperimentParticipantDto } from './dto/experiment-participant.dto';
import { ExperimentTaskExecutionDto } from './dto/experiment-tasks-execution.dto';
import { ExperimentSurveyStatsDto } from './dto/experiment-surveys-stats.dto';

@ApiTags('Experiment')
@Controller('experiment')
export class ExperimentController {
  constructor(private readonly experimentService: ExperimentService) { }

  @Post()
  @ApiOperation({ summary: 'Create an experiment' })
  @ApiBody({ type: CreateExperimentDto })
  @ApiResponse({ status: 201, description: 'Experiment created successfully.' })
  async create(
    @Body() createExperimentDto: CreateExperimentDto,
  ): Promise<Experiment> {
    return await this.experimentService.create(createExperimentDto);
  }

  @Post('import/:ownerId')
  @ApiOperation({ summary: 'Import experiment from YAML file' })
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'ownerId', type: String, description: 'Owner ID' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
      },
      required: ['file'],
    },
  })
  @ApiResponse({ status: 201, description: 'Experiment imported successfully.' })
  @UseInterceptors(FileInterceptor('file'))
  async importExperiment(
    @Param('ownerId') ownerId: string,
    @UploadedFile() file: any,
  ): Promise<string[]> {
    if (!file) {
      throw new Error('No file uploaded');
    }

    const yamlContent = file.buffer.toString('utf-8');
    return await this.experimentService.importFromYaml(yamlContent, ownerId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all experiments' })
  @ApiResponse({ status: 200, description: 'List of experiments.' })
  async findAll(): Promise<Experiment[]> {
    return await this.experimentService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single experiment by id' })
  @ApiParam({ name: 'id', type: String, description: 'Experiment ID' })
  @ApiResponse({ status: 200, description: 'Experiment details.' })
  @ApiResponse({ status: 404, description: 'Experiment not found.' })
  async findOne(@Param('id') id: string): Promise<Experiment> {
    return await this.experimentService.find(id);
  }

  @Get('owner/:ownerId')
  @ApiOperation({ summary: 'Get experiments by ownerId' })
  @ApiParam({ name: 'ownerId', type: String, description: 'Owner ID' })
  @ApiResponse({ status: 200, description: 'Experiments for the owner.' })
  async findByOwenerId(
    @Param('ownerId') ownerId: string,
  ): Promise<Experiment[]> {
    return await this.experimentService.findByOwnerId(ownerId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an experiment by id' })
  @ApiParam({ name: 'id', type: String, description: 'Experiment ID' })
  @ApiBody({ type: UpdateExperimentDto })
  @ApiResponse({ status: 200, description: 'Experiment updated successfully.' })
  async update(
    @Param('id') id: string,
    @Body() updateExperimentDto: UpdateExperimentDto,
  ): Promise<Experiment> {
    return await this.experimentService.update(id, updateExperimentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an experiment by id' })
  @ApiParam({ name: 'id', type: String, description: 'Experiment ID' })
  @ApiResponse({ status: 200, description: 'Experiment deleted successfully.' })
  async remove(@Param('id') id: string) {
    return await this.experimentService.remove(id);
  }

  @Get(':id/stats')
  @ApiOperation({ summary: 'Get experiment statistics' })
  @ApiParam({ name: 'id', type: String, description: 'Experiment ID' })
  @ApiResponse({ status: 200, description: 'Experiment statistics.' })
  async getStats(@Param('id') id: string): Promise<ExperimentStatsDto> {
    return await this.experimentService.getStats(id);
  }

  @Get(':id/participants')
  @ApiOperation({ summary: 'Get experiment participants details' })
  @ApiParam({ name: 'id', type: String, description: 'Experiment ID' })
  @ApiResponse({ status: 200, description: 'Participants details.' })
  async getParticipants(@Param('id') id: string): Promise<ExperimentParticipantDto[]> {
    return await this.experimentService.getParticipants(id);
  }

  @Get(':id/tasks-execution')
  @ApiOperation({ summary: 'Get experiment tasks execution details' })
  @ApiParam({ name: 'id', type: String, description: 'Experiment ID' })
  @ApiResponse({ status: 200, description: 'Task execution details.' })
  async getTasksExecution(@Param('id') id: string): Promise<ExperimentTaskExecutionDto[]> {
    return await this.experimentService.getTasksExecutionDetails(id);
  }


  @Get(':id/surveys-stats')
  @ApiOperation({ summary: 'Get experiment surveys statistics' })
  @ApiParam({ name: 'id', type: String, description: 'Experiment ID' })
  @ApiResponse({ status: 200, description: 'Survey statistics for the experiment.' })
  async getSurveysStats(@Param('id') id: string): Promise<ExperimentSurveyStatsDto> {
    return await this.experimentService.getSurveysStats(id);
  }

  @Get('export/:id')
  @ApiOperation({ summary: 'Export experiment as YAML file' })
  @Header('Content-Type', 'application/x-yaml')
  @ApiParam({ name: 'id', type: String, description: 'Experiment ID' })
  @ApiProduces('application/x-yaml')
  @ApiResponse({ status: 200, description: 'YAML file content.' })
  async exportExperiment(
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    const yamlContent = await this.experimentService.exportToYaml(id);
    const experiment = await this.experimentService.find(id);
    const filename = `experiment_${experiment.name.replace(/[^a-zA-Z0-9]/g, '_')}.yaml`;

    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Type', 'application/x-yaml');
    res.send(yamlContent);
  }

  @Get('general-info/:experimentId')
  @ApiOperation({ summary: 'Get general experiment info' })
  @ApiParam({ name: 'experimentId', type: String, description: 'Experiment ID' })
  @ApiResponse({ status: 200, description: 'General experiment information.' })
  async getGeneralExperimentInfo(@Param('experimentId') experimentId: string) {
    return await this.experimentService.getGeneralExpirementInfos(experimentId);
  }

  @Get(':id/step')
  @ApiOperation({ summary: 'Get steps from experiment' })
  @ApiParam({ name: 'id', type: String, description: 'Experiment ID' })
  @ApiResponse({ status: 200, description: 'Experiment steps.' })
  async getStep(@Param('id') id: string) {
    return await this.experimentService.buildStep(id);
  }
}
