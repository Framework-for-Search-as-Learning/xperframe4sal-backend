/*
 * Copyright (c) 2026, lapic-ufjf
 * Licensed under The MIT License [see LICENSE for details]
 */

import {forwardRef, Module} from '@nestjs/common';
import {IcfService} from './icf.service';
import {IcfController} from './icf.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Icf} from './entity/icf.entity';
import {ExperimentsModule} from '../experiments/experiments.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Icf]),
    forwardRef(() => ExperimentsModule),
  ],
  providers: [IcfService],
  controllers: [IcfController],
  exports: [IcfService],
})
export class IcfModule {}
