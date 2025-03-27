import { Module } from '@nestjs/common';
import { ICFService } from './icf.service';
import { ICFController } from './icf.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ICF, ICFSchema } from '../../model/icf.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: ICF.name, schema: ICFSchema }])],
  controllers: [ICFController],
  providers: [ICFService],
})
export class IcfModule {}
