import {forwardRef, Module} from '@nestjs/common';
import {Task2Service} from './task2.service';
import {Task2Controller} from './task2.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Task} from './entities/task.entity';
import {Experiments2Module} from '../experiments2/experiments2.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    forwardRef(() => Experiments2Module),
  ],
  providers: [Task2Service],
  controllers: [Task2Controller],
  exports: [Task2Service],
})
export class Task2Module {}
