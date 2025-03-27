import {BaseEntity} from 'src/model/base_entity2';
import {Survey} from 'src/modules/survey2/entity/survey.entity';
import {Task} from 'src/modules/task2/entities/task.entity';
import {UserExperiment} from 'src/modules/user-experiments2/entities/user-experiments.entity';
import {User} from 'src/modules/user2/entity/user.entity';
import {Column, Entity, ManyToOne, OneToMany} from 'typeorm';

enum SurveyType {
  PRE = 'pre',
  POST = 'post',
  OTHER = 'other',
}

export class SurveyProps {
  id: string;
  uniqueAnswer: boolean = false;
  type: SurveyType = SurveyType.OTHER;
  required: boolean = false;
}
export class TaskProps {
  id: string;
  title: string;
  summary: string;
  description: string;
  toWhom: string = 'all';
  required: boolean = true;
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
  @Column({nullable: true})
  owner_id: string;
  @ManyToOne(() => User)
  owner: User;
  @Column()
  summary: string;
  @Column()
  typeExperiment: string;
  @Column()
  betweenExperimentType: string;
  @OneToMany(() => Task, (task) => task.experiment)
  tasks: Task[];
  @OneToMany(
    () => UserExperiment,
    (userExperiment) => userExperiment.experiment,
  )
  userExperiments: UserExperiment[];
  @OneToMany(() => Survey, (survey) => survey.experiment)
  surveys: Survey[];
  //TODO icfID
  //TODO steps
}
