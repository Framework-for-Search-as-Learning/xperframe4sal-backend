import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {BaseEntity} from './base.entity';
import {StepsType} from './experiment.entity';

@Schema()
export class UserExperiment extends BaseEntity {
  @Prop({required: true})
  userId: string;
  @Prop({required: true})
  experimentId: string;
  @Prop({required: true, default: false})
  hasFinished: boolean = false;
  @Prop({type: {}, default: {}})
  stepsCompleted: Record<StepsType, boolean>;
  @Prop({default: {}, type: {}})
  logs: Record<string, any>;
  @Prop({default: {}, type: {}})
  more: Record<string, any>;
}

export const UserExperimentSchema =
  SchemaFactory.createForClass(UserExperiment);
