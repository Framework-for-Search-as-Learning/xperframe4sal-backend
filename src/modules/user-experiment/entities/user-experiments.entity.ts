/*
 * Copyright (c) 2026, lapic-ufjf
 * Licensed under The MIT License [see LICENSE for details]
 */

import { BaseEntity } from 'src/model/base_entity';
import {
  Experiment,
  StepsType,
} from 'src/modules/experiment/entity/experiment.entity';
import { User } from 'src/modules/user/entity/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

export enum UserExperimentStatus {
  FINISHED = 'FINISHED',
  IN_PROGRESS = 'IN_PROGRESS',
  NOT_STARTED = 'NOT_STARTED',
}

@Entity()
export class UserExperiment extends BaseEntity {
  @ManyToOne(() => User, (user) => user.userExperiments, { onDelete: 'CASCADE' })
  user: User;
  @Column()
  user_id: string;

  @ManyToOne(() => Experiment, (experiment) => experiment.userExperiments, {
    onDelete: 'CASCADE',
  })
  experiment: Experiment;
  @Column()
  experiment_id: string;
  @Column({ default: false })
  hasFinished: boolean = false;

  @Column({
    type: 'enum',
    enum: UserExperimentStatus,
    default: UserExperimentStatus.NOT_STARTED,
  })
  status: UserExperimentStatus;

  @Column({ nullable: true })
  startDate: Date;

  @Column({ nullable: true })
  completionDate: Date;

  @Column({ type: 'jsonb', default: {} })
  stepsCompleted: Record<StepsType, boolean>;

  //TODO logs
}
