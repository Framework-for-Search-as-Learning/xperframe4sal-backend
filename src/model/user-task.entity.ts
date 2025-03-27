import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from './base.entity';

@Schema()
export class UserTask extends BaseEntity {
  @Prop({ required: true })
  userId: string;
  @Prop({ required: true })
  taskId: string;
  @Prop({ default: false })
  hasFinishedTask: boolean = false;
  @Prop({ default: false })
  isPaused: boolean = false;
  @Prop({ type: Date })
  startTime: Date = null;
  @Prop({ default: [], type: [Date] })
  pauseTime: Date[] = [];
  @Prop({ default: [], type: [Date] })
  resumeTime: Date[] = [];
  @Prop({ type: Date })
  endTime: Date = null;

  constructor(userId: string, taskId: string) {
    super();
    this.userId = userId;
    this.taskId = taskId;
  }
}


export const UserTaskSchema =
  SchemaFactory.createForClass(UserTask);
