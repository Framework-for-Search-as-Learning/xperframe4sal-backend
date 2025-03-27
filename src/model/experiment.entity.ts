import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from './base.entity';

enum SurveyType {
  PRE = 'pre',
  POST = 'post',
  OTHER = 'other',
}

export enum StepsType {
  ICF = 'icf',
  PRE = 'pre',
  POST = 'post',
  TASK = 'task',
}

@Schema()
export class SurveyProps {
  @Prop()
  id: string;
  @Prop({ default: false })
  uniqueAnswer: boolean = false;
  @Prop({ required: true, default: SurveyType.OTHER })
  type: SurveyType = SurveyType.OTHER;
  @Prop({ required: true, default: false })
  required: boolean = false;
}

@Schema()
export class TaskProps {
  @Prop()
  id: string;
  @Prop({ required: true, default: "all" })
  toWhom: string = "all";
  @Prop({ required: true, default: true })
  required: boolean = true;
}

@Schema()
export class UserProps {
  @Prop()
  id: string;
  @Prop()
  name: string;
  @Prop()
  email: string;
}

@Schema()
export class Experiment extends BaseEntity {
  @Prop({required: true})
  ownerId: string;
  @Prop({ required: true })
  name: string;
  @Prop({required: true})
  typeExperiment: string;
  @Prop()
  betweenExperimentType: string;
  @Prop()
  summary: string;
  @Prop()
  icfId: string;
  @Prop({ type: {}, default: {} })
  surveysProps: Record<string, SurveyProps>;
  @Prop({ type: {}, default: {} })
  tasksProps: Record<string, TaskProps>;
  @Prop({ type: {}, default: {} })
  userProps: Record<string, UserProps>;

  @Prop({ type: {}, default: {} })
  steps: Record<StepsType, any>;

}

export const ExperimentSchema =
  SchemaFactory.createForClass(Experiment);
