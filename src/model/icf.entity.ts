import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from './base.entity';

@Schema()
export class ICF extends BaseEntity {
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  researchTitle: string;
  @Prop({ required: true })
  agreementStatement: string;
  @Prop()
  description: string;
  @Prop()
  icfText: string
  @Prop()
  researchers: string[];
  @Prop()
  contact: string;

}

export const ICFSchema =
  SchemaFactory.createForClass(ICF);
