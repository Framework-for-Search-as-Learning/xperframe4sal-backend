import {Module} from '@nestjs/common';
import {Icf2Service} from './icf2.service';
import {Icf2Controller} from './icf2.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Icf} from './entity/icf.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Icf])],
  providers: [Icf2Service],
  controllers: [Icf2Controller],
  exports: [Icf2Service],
})
export class Icf2Module {}
