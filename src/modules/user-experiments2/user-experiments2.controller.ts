import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags, ApiBody, ApiQuery } from '@nestjs/swagger';
import { UserExperiments2Service } from './user-experiments2.service';
import { CreateUserExperimentDto } from './dto/create-userExperiment.dto';
import { UserExperiment } from './entities/user-experiments.entity';
import { UpdateUserExperimentDto } from './dto/update-userExperiment.dto';
import { GetUserDto } from 'src/model/user.dto';
import { Experiment } from '../experiments2/entity/experiment.entity';
import { User } from '../user2/entity/user.entity';

@ApiTags('user-experiments2')
@Controller('user-experiments2')
export class UserExperiments2Controller {
  constructor(
    private readonly userExperimentService: UserExperiments2Service,
  ) { }

  @Post()
  @ApiOperation({ summary: 'Create a user experiment' })
  @ApiBody({ type: CreateUserExperimentDto })
  async create(
    @Body() createUserExperimentDto: CreateUserExperimentDto,
  ): Promise<UserExperiment> {
    return await this.userExperimentService.create(createUserExperimentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all user experiments' })
  @ApiQuery({
    name: 'userId',
    required: false,
    type: String,
    description: 'User ID to filter',
  })
  @ApiQuery({
    name: 'experimentId',
    required: false,
    type: String,
    description: 'Experiment ID to filter',
  })
  async findAll(
    @Query('userId') userId: string,
    @Query('experimentId') experimentId: string,
  ): Promise<UserExperiment[] | UserExperiment> {
    if (userId) {
      if (experimentId) {
        return await this.userExperimentService.findByUserAndExperimentId(
          userId,
          experimentId,
        );
      }
      return await this.userExperimentService.findByUserId(userId);
    }
    return await this.userExperimentService.findAll();
  }

  @Get('/experiment/:experimentId')
  @ApiOperation({ summary: 'Get users by experiment id' })
  async findUsersByExperimentId(
    @Param('experimentId') experimentId: string,
  ): Promise<GetUserDto[]> {
    const users =
      await this.userExperimentService.findUsersByExperimentId(experimentId);
    return users.map((user) => {
      return {
        id: user._id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        researcher: user.researcher,
      };
    });
  }

  @Get('/user/:userId')
  @ApiOperation({ summary: 'Get experiments by user id' })
  async findExperimentsByUserId(
    @Param('userId') userId: string,
  ): Promise<Experiment[]> {
    const experiments =
      await this.userExperimentService.findExperimentsByUserId(userId);
    return experiments;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a user experiment' })
  @ApiBody({ type: UpdateUserExperimentDto })
  async update(
    @Param('id') id: string,
    @Body() updateUserExperimentDto: UpdateUserExperimentDto,
  ): Promise<UserExperiment> {
    const result = await this.userExperimentService.update(
      id,
      updateUserExperimentDto,
    );
    return result;
  }

  @Patch('finish/:id')
  @ApiOperation({ summary: 'Mark a user experiment as finished' })
  async finish(
    @Param('id') id: string,
  ): Promise<UserExperiment> {
    const result = await this.userExperimentService.finish(id);
    return result;
  }

  @Patch('/update-users/:id')
  async updateExperimentUsers(
    @Param('id') id: string,
    @Body() body: { newUsersId: string[] },
  ): Promise<User[]> {
    const { newUsersId } = body;
    return this.userExperimentService.updateExperimentUsers(id, newUsersId);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete user experiment by user and experiment id' })
  @ApiQuery({
    name: 'userId',
    required: true,
    type: String,
    description: 'User ID',
  })
  @ApiQuery({
    name: 'experimentId',
    required: true,
    type: String,
    description: 'Experiment ID',
  })
  async removeByUserAndExperimentId(
    @Query('userId') userId: string,
    @Query('experimentId') experimentId: string,
  ) {
    return await this.userExperimentService.removeByUserIdAndExperimentId(
      userId,
      experimentId,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user experiment by id' })
  async remove(@Param('id') id: string) {
    return await this.userExperimentService.remove(id);
  }
}
