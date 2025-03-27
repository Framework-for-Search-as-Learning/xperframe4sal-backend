import {forwardRef, Module} from '@nestjs/common';
import {Survey2Controller} from './survey2.controller';
import {Survey2Service} from './survey2.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Survey} from './entity/survey.entity';
import {Experiments2Module} from '../experiments2/experiments2.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Survey]),
    forwardRef(() => Experiments2Module),
  ],
  controllers: [Survey2Controller],
  providers: [Survey2Service],
  exports: [Survey2Service],
})
export class Survey2Module {}
