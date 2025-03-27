import {BaseEntity} from 'src/model/base_entity2';
import {
  Experiment,
  StepsType,
} from 'src/modules/experiments2/entity/experiment.entity';
import {User} from 'src/modules/user2/entity/user.entity';
import {Column, Entity, ManyToOne} from 'typeorm';

@Entity()
export class UserExperiment extends BaseEntity {
  /* Na documentacao existia essas colunas, porem não acho necessario
  @Column()
  userId: string;
  @Column()
  experimentId: string;*/

  @ManyToOne(() => User, (user) => user.userExperiments)
  user: User;
  @Column()
  user_id: string;

  @ManyToOne(() => Experiment, (experiment) => experiment.userExperiments)
  experiment: Experiment;
  @Column()
  experiment_id: string;
  @Column({default: false})
  hasFinished: boolean = false;
  @Column({type: 'jsonb', default: {}})
  stepsCompleted: Record<StepsType, boolean>;

  //TODO logs
}
