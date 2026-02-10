import { LlmSession } from 'src/llm-session/entity/llm-session.entity';
import { BaseEntity } from 'src/model/base_entity2';
import { Experiment } from 'src/modules/experiments2/entity/experiment.entity';
import { Survey } from 'src/modules/survey2/entity/survey.entity';
import { TaskQuestionMap } from 'src/modules/task-question-map/entity/taskQuestionMap.entity';
import { UserTaskSession } from 'src/modules/user-task-session2/entities/user-task-session.entity';
import { UserTask } from 'src/modules/user-task2/entities/user-tasks.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

export type TaskProviderConfig = {
  provider?: string;
  model?: string;
  apiKey?: string;
  cx?: string;
  [key: string]: unknown;
};

@Entity()
export class Task extends BaseEntity {
  @Column()
  title: string;
  @Column()
  summary: string;
  @Column()
  description: string;
  @Column()
  search_source: string;
  @Column()
  search_model: string;

  @Column({
    type: 'jsonb',
    nullable: true,
    select: false,
  })
  provider_config?: TaskProviderConfig;

  @OneToMany(() => LlmSession, (session) => session.task)
  llmSessions: LlmSession[];

  @ManyToOne(() => Experiment, (experiment) => experiment.tasks, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  experiment: Experiment;
  @Column()
  experiment_id: string;

  @ManyToOne(() => Survey, (survey) => survey.tasks, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  survey: Survey;
  @Column({ nullable: true })
  survey_id: string;

  @OneToMany(() => TaskQuestionMap, (taskQuestionMap) => taskQuestionMap.task, {
    cascade: true,
  })
  taskQuestionsMap: TaskQuestionMap[];

  @Column({ nullable: true })
  rule_type: string;

  @Column({ nullable: true })
  max_score: number;
  @Column({ nullable: true })
  min_score: number;

  @OneToMany(() => UserTask, (userTask) => userTask.task, { cascade: true })
  userTasks: UserTask[];

  //TODO verificar a utilidade de colocar isso
  @OneToMany(() => UserTaskSession, (session) => session.task)
  sessions: UserTaskSession[];
}
