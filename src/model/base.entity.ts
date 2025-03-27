import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export abstract class BaseEntity {
  _id: string;
  @Prop({ type: 'boolean', default: true })
  isActive: boolean;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  lastChangedAt: Date;
}