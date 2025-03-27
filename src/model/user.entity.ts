import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { BaseEntity } from './base.entity';

export enum Role {
  USER,
  ADMIN,
  SUPER_ADMIN,
}

@Schema()
export class User extends BaseEntity {
  @Prop()
    researcher: boolean;
  @Prop({
    required: true,
  })
  name: string;
  @Prop({
    required: true,
  })
  lastName: string;
  @Prop({
    required: true,
    unique: true,
    type: String,
  })
  email: string;
  @Prop({ required: true })
  password: string;
  @Prop()
  birthDate: Date;
  @Prop({ type: String, enum: Role, default: Role.USER })
  role: Role = Role.USER;
  @Prop()
  recoveryPasswordToken: string;
  @Prop()
  recoveryPasswordTokenExpirationDate: Date;
  @Prop({ default: {}, type: {} })
  more: Record<string, any>;
}

export const UserSchema = SchemaFactory.createForClass(User);
