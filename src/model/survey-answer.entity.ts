import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from './base.entity';


@Schema()
export class SurveyAnswers extends BaseEntity {
  @Prop({ required: true })
  userId: string;
  @Prop({ required: true })
  surveyId: string;
  @Prop({ default: {}, type: {} })
  answers: Record<string, any>;
  @Prop({ default: null })
  score: number;
  @Prop({ default: {}, type: {} })
  more: Record<string, any>;
}

export const UserSurveySchema =
  SchemaFactory.createForClass(SurveyAnswers);