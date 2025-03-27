import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { BaseEntity } from './base.entity';



enum QuestionType {
  MULTIPLE_CHOICES = 'multiple-choices',
  OPEN = 'open',
  MULTIPLE_SELECTION = 'multiple-selection',
}

@Schema()
export class Question {
  @Prop({ required: true, type: String })
  statement: string;
  @Prop({ required: true, default: QuestionType.MULTIPLE_CHOICES })
  type: QuestionType = QuestionType.MULTIPLE_CHOICES;
  @Prop({ type: [{ type: SchemaTypes.Mixed }] })
  options: (Options | string)[]
  @Prop({ default: false, required: true })
  required: boolean;
  @Prop({ required: false, default: 'Outro (especifique)' })
  otherStatement: string;
  @Prop()
  helperText: string;
}

@Schema()
export class Options {
  @Prop()
  statement: string;
  @Prop()
  score: number;
  @Prop()
  subQuestion: Question[];
  @Prop()
  type: string;
  @Prop()
  functionName: string;
}

@Schema()
export class Survey extends BaseEntity {
  @Prop({ required: true })
  name: string
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  description: string;
  @Prop({ required: true })
  questions: Question[];
}
export const SurveySchema =
  SchemaFactory.createForClass(Survey);
