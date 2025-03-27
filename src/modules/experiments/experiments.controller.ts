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
import {ExperimentsService} from './experiments.service';
import {Experiment} from '../../model/experiment.entity';
import {AuthGuard} from '@nestjs/passport';
import {ApiExcludeController} from '@nestjs/swagger';

@ApiExcludeController()
@Controller('experiments')
export class ExperimentsController {
  constructor(private readonly experimentService: ExperimentsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() experiment: Experiment): Promise<Experiment> {
    return await this.experimentService.create(experiment);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(): Promise<Experiment[]> {
    return this.experimentService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Experiment> {
    return this.experimentService.find(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() experiment: Experiment,
  ): Promise<Experiment> {
    experiment.lastChangedAt = new Date();
    return await this.experimentService.update(id, experiment);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.experimentService.remove(id);
  }
}
