import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from './base.entity';

export interface HandlePageDto {
  url: string,
  title: string
}

@Schema()
export class Page {
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  url: string;
  @Prop({ required: true })
  startTime: Date;
  @Prop({ required: true })
  endTime: Date;
  @Prop({ default: {}, type: {} })
  more: Record<string, any>;

  constructor(title: string, url: string, startTime: Date = null, endTime: Date = null) {
    this.title = title;
    this.url = url;
    this.startTime = startTime;
    this.endTime = endTime;
  }
}

@Schema()
export class UserTaskSession extends BaseEntity {
  @Prop({ required: true })
  userId: string;
  @Prop({ required: true })
  taskId: string;
  @Prop({ required: true })
  query: string;
  @Prop({ required: true })
  timestamp: Date;
  @Prop({ required: true, default: 1 })
  serpNumber: number;
  @Prop({ required: true, type: {} })
  pages: Record<number, Page[]>;
  @Prop({ default: {}, type: {} })
  more: Record<string, any>;
}

export const UserTaskSessionSchema =
  SchemaFactory.createForClass(UserTaskSession);

