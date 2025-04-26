import {Task} from 'src/modules/task2/entities/task.entity';
import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class TaskQuestionMap {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @ManyToOne(() => Task, (task) => task.taskQuestionsMap, {onDelete: 'CASCADE'})
  task: Task;
  @Column()
  task_id: string;
  @Column()
  question_id: number;
}
