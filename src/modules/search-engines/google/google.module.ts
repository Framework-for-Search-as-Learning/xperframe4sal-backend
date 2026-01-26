import { Module } from '@nestjs/common';
import { GoogleController } from './google.controller';
import { GoogleService } from './google.service';
import { HttpModule } from 'src/modules/http/http.module';
import { Experiments2Module } from 'src/modules/experiments2/experiments2.module';

@Module({
  imports: [HttpModule, Experiments2Module],
  controllers: [GoogleController],
  providers: [GoogleService],
  exports: [GoogleService],
})
export class GoogleModule { }
