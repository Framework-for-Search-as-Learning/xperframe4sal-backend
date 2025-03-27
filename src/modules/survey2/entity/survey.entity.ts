import {BaseEntity} from 'src/model/base_entity2';
import {Experiment} from 'src/modules/experiments2/entity/experiment.entity';
import {SurveyAnswer} from 'src/modules/survey-answer2/entity/survey-answer.entity';
import {Task} from 'src/modules/task2/entities/task.entity';
import {Column, Entity, ManyToOne, OneToMany} from 'typeorm';

export enum SurveyType {
  PRE = 'pre',
  POST = 'post',
  OTHER = 'other',
}

@Entity()
export class Survey extends BaseEntity {
  @Column()
  name: string;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column({type: 'jsonb'})
  questions: any[];
  @Column({
    type: 'enum',
    enum: SurveyType,
  })
  type: SurveyType = SurveyType.OTHER;
  @Column()
  experiment_id: string;
  @ManyToOne(() => Experiment, (experiment) => experiment.surveys)
  experiment: Experiment;
  @OneToMany(() => SurveyAnswer, (surveyAnswer) => surveyAnswer.survey)
  surveyAnswers: SurveyAnswer[];

  @OneToMany(() => Task, (task) => task.survey)
  tasks: Task[];
}
