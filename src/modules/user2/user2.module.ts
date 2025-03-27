import {Module} from '@nestjs/common';
import {User2Service} from './user2.service';
import {User2Controller} from './user2.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from './entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [User2Service],
  controllers: [User2Controller],
  exports: [User2Service],
})
export class User2Module {}
