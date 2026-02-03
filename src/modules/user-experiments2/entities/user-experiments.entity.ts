import {BaseEntity} from 'src/model/base_entity2';
import {
  Experiment,
  StepsType,
} from 'src/modules/experiments2/entity/experiment.entity';
import {User} from 'src/modules/user2/entity/user.entity';
import {Column, Entity, ManyToOne} from 'typeorm';

export enum UserExperimentStatus {
  FINISHED = 'finished',
  IN_PROGRESS = 'in_progress',
  NOT_STARTED = 'not_started',
}

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

  @Column({
    type: 'enum',
    enum: UserExperimentStatus,
    default: UserExperimentStatus.NOT_STARTED,
  })
  status: UserExperimentStatus;

  @Column({nullable: true})
  startDate: Date;

  @Column({nullable: true})
  completionDate: Date;

  @Column({type: 'jsonb', default: {}})
  stepsCompleted: Record<StepsType, boolean>;

  //TODO logs
}
