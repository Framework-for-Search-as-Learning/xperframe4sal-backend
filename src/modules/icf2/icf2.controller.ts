import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {Icf2Service} from './icf2.service';
import {CreateIcfDto} from './dto/create-icf.dto';
import {Icf} from './entity/icf.entity';
import {UpdateIcfDto} from './dto/update-icf.dto';
import {ApiBody, ApiOperation} from '@nestjs/swagger';

@Controller('icf2')
export class Icf2Controller {
  constructor(private readonly icfService: Icf2Service) {}

  @Post()
  @ApiOperation({summary: 'Create a icf'})
  @ApiBody({type: CreateIcfDto})
  async create(@Body() createIcfDto: CreateIcfDto): Promise<Icf> {
    return await this.icfService.create(createIcfDto);
  }

  @ApiOperation({summary: 'Get all icfs'})
  @Get()
  async findAll(): Promise<Icf[]> {
    return await this.icfService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary: 'Get a icf by id'})
  async findOne(@Param('id') id: string): Promise<Icf> {
    return await this.icfService.find(id);
  }

  @Patch(':id')
  @ApiOperation({summary: 'Update a icf by id'})
  @ApiBody({type: UpdateIcfDto})
  async update(
    @Param('id') id: string,
    @Body() updateIcfDto: UpdateIcfDto,
  ): Promise<Icf> {
    return await this.icfService.update(id, updateIcfDto);
  }

  @Delete(':id')
  @ApiOperation({summary: 'Delete a icf by id'})
  async remove(@Param('id') id: string) {
    return await this.icfService.remove(id);
  }
}
