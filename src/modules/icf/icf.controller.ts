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
import { ICFService } from './icf.service';
import { ICF } from '../../model/icf.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('icf')
export class ICFController {
  constructor(private readonly icfService: ICFService) { }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() icf: ICF) {
    return await this.icfService.create(icf);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(): Promise<ICF[]> {
    return await this.icfService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ICF> {
    return await this.icfService.find(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async update(@Param('id') id: string, @Body() icf: ICF): Promise<ICF> {
    icf.lastChangedAt = new Date();
    return await this.icfService.update(id, icf);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.icfService.remove(id);
  }
}
