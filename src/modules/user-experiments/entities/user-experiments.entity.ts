/*
 * Copyright (c) 2026, marcelomachado
 * Licensed under The MIT License [see LICENSE for details]
 */

import {BaseEntity} from 'src/model/base.entity';
import {
  Experiment,
  StepsType,
} from 'src/modules/experiments/entity/experiment.entity';
import {User} from 'src/modules/user/entity/user.entity';
import {Column, Entity, ManyToOne} from 'typeorm';

@Entity()
export class UserExperiment extends BaseEntity {
  @ManyToOne(() => User, (user) => user.userExperiments, {onDelete: 'CASCADE'})
  user: User;
  @Column()
  user_id: string;

  @ManyToOne(() => Experiment, (experiment) => experiment.userExperiments, {
    onDelete: 'CASCADE',
  })
  experiment: Experiment;
  @Column()
  experiment_id: string;
  @Column({default: false})
  hasFinished: boolean = false;
  @Column({type: 'jsonb', default: {}})
  stepsCompleted: Record<StepsType, boolean>;

  //TODO logs
}
