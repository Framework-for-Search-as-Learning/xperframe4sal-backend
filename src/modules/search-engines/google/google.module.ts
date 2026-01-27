import { Module } from '@nestjs/common';
import { GoogleController } from './google.controller';
import { GoogleService } from './google.service';
import { HttpModule } from 'src/modules/http/http.module';
import { Task2Module } from 'src/modules/task2/task2.module';

@Module({
  imports: [HttpModule, Task2Module],
  controllers: [GoogleController],
  providers: [GoogleService],
  exports: [GoogleService],
})
export class GoogleModule { }
