import { Module } from '@nestjs/common';
import { GoogleController } from './google.controller';
import { GoogleService } from './google.service';
import { HttpModule } from 'src/modules/http/http.module';
import { TaskModule } from 'src/modules/task/task.module';

@Module({
  imports: [HttpModule, TaskModule],
  controllers: [GoogleController],
  providers: [GoogleService],
  exports: [GoogleService],
})
export class GoogleModule { }
