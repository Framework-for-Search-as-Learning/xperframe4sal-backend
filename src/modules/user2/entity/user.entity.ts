import {BaseEntity} from 'src/model/base_entity2';
import {SurveyAnswer} from 'src/modules/survey-answer2/entity/survey-answer.entity';
import {UserExperiment} from 'src/modules/user-experiments2/entities/user-experiments.entity';
import {UserTask} from 'src/modules/user-task2/entities/user-tasks.entity';
import {Column, Entity, OneToMany} from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @Column()
  name: string;
  @Column()
  lastName: string;
  @Column({unique: true, nullable: false})
  email: string;
  @Column({nullable: false})
  password: string;
  @Column({nullable: true})
  birthDate: Date;
  @Column({nullable: true})
  recoveryPasswordToken: string;
  @Column({nullable: true})
  recoveryPasswordTokenExpirationDate: Date;
  @Column({nullable: true})
  researcher: boolean = true;
  @OneToMany(() => UserExperiment, (userExperiment) => userExperiment.user)
  userExperiments: UserExperiment[];
  @OneToMany(() => UserTask, (userTask) => userTask.user)
  userTasks: UserTask[];
  @OneToMany(() => SurveyAnswer, (surveyAnswer) => surveyAnswer.user)
  surveyAnswers: SurveyAnswer[];

  //TODO role
}
