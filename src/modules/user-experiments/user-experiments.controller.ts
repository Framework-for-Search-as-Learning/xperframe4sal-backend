import {
  Controller,
  Get,
  Delete,
  Query,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import {UserExperimentsService} from './user-experiments.service';
import {UserExperiment} from 'src/model/user-experiment.entity';
import {AuthGuard} from '@nestjs/passport';
import {ApiExcludeController} from '@nestjs/swagger';

@ApiExcludeController()
@Controller('user-experiments')
export class UserExperimentsController {
  constructor(
    private readonly _userExperimentsService: UserExperimentsService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(
    @Body() userExperiment: UserExperiment,
  ): Promise<UserExperiment> {
    return await this._userExperimentsService.create(userExperiment);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(
    @Query('userId') userId: string,
    @Query('experimentId') experimentId: string,
  ): Promise<UserExperiment[] | UserExperiment> {
    if (userId) {
      if (experimentId) {
        return await this._userExperimentsService.findByUserIdAndExperimentId(
          userId,
          experimentId,
        );
      }
      return await this._userExperimentsService.findByUserId(userId);
    }
    return await this._userExperimentsService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() userExperiment: UserExperiment,
  ): Promise<UserExperiment> {
    userExperiment.lastChangedAt = new Date();
    const result = await this._userExperimentsService.update(
      id,
      userExperiment,
    );
    return result;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete()
  async removeByUserIdAndExperimentId(
    @Query('userId') userId: string,
    @Query('experimentId') experimentId: string,
  ) {
    return await this._userExperimentsService.removeByUserIdAndExperimentId(
      userId,
      experimentId,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this._userExperimentsService.remove(id);
  }
}
