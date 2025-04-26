import {forwardRef, Module} from '@nestjs/common';
import {Icf2Service} from './icf2.service';
import {Icf2Controller} from './icf2.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Icf} from './entity/icf.entity';
import {Experiments2Module} from '../experiments2/experiments2.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Icf]),
    forwardRef(() => Experiments2Module),
  ],
  providers: [Icf2Service],
  controllers: [Icf2Controller],
  exports: [Icf2Service],
})
export class Icf2Module {}
