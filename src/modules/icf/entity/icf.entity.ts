/*
 * Copyright (c) 2026, marcelomachado
 * Licensed under The MIT License [see LICENSE for details]
 */

import {BaseEntity} from 'src/model/base.entity';
import {Experiment} from 'src/modules/experiments/entity/experiment.entity';
import {Column, Entity, ManyToOne} from 'typeorm';

@Entity()
export class Icf extends BaseEntity {
  @Column()
  title: string;
  @Column()
  description: string;
  /* 
  @Column()
  researchTitle: string;
  @Column()
  agreementStatement: string;
  @Column()
  description: string;
  //TODO ver como fazer no postgres
  //@Column()
  //researchers: string[];
  @Column()
  contact: string;
  */
  @ManyToOne(() => Experiment, (experiment) => experiment.icfs, {
    onDelete: 'CASCADE',
  })
  experiment: Experiment;
  @Column()
  experiment_id: string;
}
