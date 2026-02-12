import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { IcfService } from './icf.service';
import { CreateIcfDto } from './dto/create-icf.dto';
import { Icf } from './entity/icf.entity';
import { UpdateIcfDto } from './dto/update-icf.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('ICF')
@ApiBearerAuth('jwt')
@UseGuards(AuthGuard('jwt'))
@Controller('icf')
export class IcfController {
  constructor(private readonly icfService: IcfService) { }

  @Post()
  @ApiOperation({ summary: 'Create a icf' })
  @ApiBody({ type: CreateIcfDto })
  @ApiResponse({ status: 201, description: 'ICF created successfully.' })
  async create(@Body() createIcfDto: CreateIcfDto): Promise<Icf> {
    return await this.icfService.create(createIcfDto);
  }

  @ApiOperation({ summary: 'Get all icfs' })
  @Get()
  @ApiResponse({ status: 200, description: 'List of ICFs.' })
  async findAll(): Promise<Icf[]> {
    return await this.icfService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a icf by id' })
  @ApiParam({ name: 'id', type: String, description: 'ICF ID' })
  @ApiResponse({ status: 200, description: 'ICF details.' })
  @ApiResponse({ status: 404, description: 'ICF not found.' })
  async findOne(@Param('id') id: string): Promise<Icf> {
    return await this.icfService.find(id);
  }

  @Get('experiment/:experimentId')
  @ApiOperation({ summary: 'Get a icf by experimentId' })
  @ApiParam({ name: 'experimentId', type: String, description: 'Experiment ID' })
  @ApiResponse({ status: 200, description: 'ICF linked to the experiment.' })
  async findOneByExperimentId(
    @Param('experimentId') experimentId: string,
  ): Promise<Icf> {
    return await this.icfService.findOneByExperimentId(experimentId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a icf by id' })
  @ApiParam({ name: 'id', type: String, description: 'ICF ID' })
  @ApiBody({ type: UpdateIcfDto })
  @ApiResponse({ status: 200, description: 'ICF updated successfully.' })
  async update(
    @Param('id') id: string,
    @Body() updateIcfDto: UpdateIcfDto,
  ): Promise<Icf> {
    return await this.icfService.update(id, updateIcfDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a icf by id' })
  @ApiParam({ name: 'id', type: String, description: 'ICF ID' })
  @ApiResponse({ status: 200, description: 'ICF deleted successfully.' })
  async remove(@Param('id') id: string) {
    return await this.icfService.remove(id);
  }
}
