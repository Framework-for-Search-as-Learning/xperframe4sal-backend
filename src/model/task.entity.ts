import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from './base.entity';

@Schema()
export class Task extends BaseEntity {
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  summary: string;
  @Prop()
  description: string;
}

export const TaskSchema =
  SchemaFactory.createForClass(Task);
