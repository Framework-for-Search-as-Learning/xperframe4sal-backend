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
import {Experiments2Service} from './experiments2.service';
import {Experiment} from './entity/experiment.entity';
import {CreateExperimentDto} from './dto/create-experiment.dto';
import {UpdateExperimentDto} from './dto/update-experiment.dto';

@ApiTags('experiments2')
@Controller('experiments2')
export class Experiments2Controller {
  constructor(private readonly experimentService: Experiments2Service) {}

  @Post()
  @ApiOperation({summary: 'Create an experiment'})
  @ApiBody({type: CreateExperimentDto})
  async create(
    @Body() createExperimentDto: CreateExperimentDto,
  ): Promise<Experiment> {
    return await this.experimentService.create(createExperimentDto);
  }

  @Get()
  @ApiOperation({summary: 'Get all experiments'})
  async findAll(): Promise<Experiment[]> {
    return await this.experimentService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary: 'Get a single experiment by id'})
  async findOne(@Param('id') id: string): Promise<Experiment> {
    return await this.experimentService.find(id);
  }

  @Patch(':id')
  @ApiOperation({summary: 'Update an experiment by id'})
  @ApiBody({type: UpdateExperimentDto})
  async update(
    @Param('id') id: string,
    @Body() updateExperimentDto: UpdateExperimentDto,
  ): Promise<Experiment> {
    return await this.experimentService.update(id, updateExperimentDto);
  }

  @Delete(':id')
  @ApiOperation({summary: 'Delete an experiment by id'})
  async remove(@Param('id') id: string) {
    return await this.experimentService.remove(id);
  }
}
