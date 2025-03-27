import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../../model/user.entity';
import { UserExperimentsModule } from '../user-experiments/user-experiments.module';
import { ExperimentsModule } from '../experiments/experiments.module';

@Module({
  imports: [
    UserExperimentsModule,
    ExperimentsModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule { }
