import { BaseEntity } from 'src/model/base_entity2';
import { Icf } from 'src/modules/icf2/entity/icf.entity';
import { Survey } from 'src/modules/survey2/entity/survey.entity';
import { Task } from 'src/modules/task2/entities/task.entity';
import { UserExperiment } from 'src/modules/user-experiments2/entities/user-experiments.entity';
import { User } from 'src/modules/user2/entity/user.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

enum SurveyType {
  PRE = 'pre',
  POST = 'post',
  OTHER = 'other',
}


export enum ExperimentStatus{
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  FINISHED = 'FINISHED',
}

export class SurveyProps {
  id: string;
  uniqueAnswer: boolean = false;
  type: SurveyType = SurveyType.OTHER;
  required: boolean = false;
}
export class TaskProps {
  //id: string;
  title: string;
  summary: string;
  description: string;
  search_source: string;
  search_model: string;
  SelectedSurvey: string;
  RulesExperiment: string; //score || question
  ScoreThreshold: number;
  ScoreThresholdmx: number;
  selectedQuestionIds: string[];
}

export class UserProps {
  id: string;
  name: string;
  email: string;
}

export enum StepsType {
  ICF = 'icf',
  PRE = 'pre',
  POST = 'post',
  TASK = 'task',
}
@Entity()
export class Experiment extends BaseEntity {
  @Column()
  name: string;
  @Column({ nullable: true })
  owner_id: string;
  @ManyToOne(() => User)
  owner: User;
  @Column()
  summary: string;
  @Column()
  typeExperiment: string;
  @Column()
  betweenExperimentType: string;

  @Column({default: ExperimentStatus.NOT_STARTED})
  status: ExperimentStatus;

  @Column({nullable: false, default: ''})
  GOOGLE_API_KEY: string;

  @Column({nullable: false, default: ''})
  GOOGLE_CX: string

  @OneToMany(() => Task, (task) => task.experiment, { cascade: true })
  tasks: Task[];
  @OneToMany(
    () => UserExperiment,
    (userExperiment) => userExperiment.experiment,
    { cascade: true },
  )
  userExperiments: UserExperiment[];
  @OneToMany(() => Survey, (survey) => survey.experiment, { cascade: true })
  surveys: Survey[];

  @OneToMany(() => Icf, (icf) => icf.experiment, { cascade: true })
  icfs: Icf[];
}
