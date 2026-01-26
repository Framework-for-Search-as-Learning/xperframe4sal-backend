import { Module } from '@nestjs/common';
import { GoogleController } from './google.controller';
import { GoogleService } from './google.service';
import { HttpModule } from 'src/modules/http/http.module';
import { Experiments2Service } from 'src/modules/experiments2/experiments2.service';

@Module({
  imports: [HttpModule, Experiments2Service],
  controllers: [GoogleController],
  providers: [GoogleService],
  exports: [GoogleService],
})
export class GoogleModule { }
