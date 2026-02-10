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
import { ApiOperation, ApiTags, ApiBody, ApiConsumes } from '@nestjs/swagger';
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

@Controller('experiment')
export class ExperimentController {
  constructor(private readonly experimentService: ExperimentService) { }

  @Post()
  @ApiOperation({ summary: 'Create an experiment' })
  @ApiBody({ type: CreateExperimentDto })
  async create(
    @Body() createExperimentDto: CreateExperimentDto,
  ): Promise<Experiment> {
    return await this.experimentService.create(createExperimentDto);
  }

  @Post('import/:ownerId')
  @ApiOperation({ summary: 'Import experiment from YAML file' })
  @ApiConsumes('multipart/form-data')
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
  async findAll(): Promise<Experiment[]> {
    return await this.experimentService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single experiment by id' })
  async findOne(@Param('id') id: string): Promise<Experiment> {
    return await this.experimentService.find(id);
  }

  @Get('owner/:ownerId')
  @ApiOperation({ summary: 'Get experiments by ownerId' })
  async findByOwenerId(
    @Param('ownerId') ownerId: string,
  ): Promise<Experiment[]> {
    return await this.experimentService.findByOwnerId(ownerId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an experiment by id' })
  @ApiBody({ type: UpdateExperimentDto })
  async update(
    @Param('id') id: string,
    @Body() updateExperimentDto: UpdateExperimentDto,
  ): Promise<Experiment> {
    return await this.experimentService.update(id, updateExperimentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an experiment by id' })
  async remove(@Param('id') id: string) {
    return await this.experimentService.remove(id);
  }

  @Get(':id/stats')
  @ApiOperation({ summary: 'Get experiment statistics' })
  async getStats(@Param('id') id: string): Promise<ExperimentStatsDto> {
    return await this.experimentService.getStats(id);
  }

  @Get(':id/participants')
  @ApiOperation({ summary: 'Get experiment participants details' })
  async getParticipants(@Param('id') id: string): Promise<ExperimentParticipantDto[]> {
    return await this.experimentService.getParticipants(id);
  }

  @Get(':id/tasks-execution')
  @ApiOperation({ summary: 'Get experiment tasks execution details' })
  async getTasksExecution(@Param('id') id: string): Promise<ExperimentTaskExecutionDto[]> {
    return await this.experimentService.getTasksExecutionDetails(id);
  }


  @Get(':id/surveys-stats')
  @ApiOperation({ summary: 'Get experiment surveys statistics' })
  async getSurveysStats(@Param('id') id: string): Promise<ExperimentSurveyStatsDto> {
    return await this.experimentService.getSurveysStats(id);
  }

  @Get('export/:id')
  @ApiOperation({ summary: 'Export experiment as YAML file' })
  @Header('Content-Type', 'application/x-yaml')
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
  async getGeneralExperimentInfo(@Param('experimentId') experimentId: string) {
    return await this.experimentService.getGeneralExpirementInfos(experimentId);
  }

  @Get(':id/step')
  @ApiOperation({ summary: 'Get steps from experiment' })
  async getStep(@Param('id') id: string) {
    return await this.experimentService.buildStep(id);
  }
}
