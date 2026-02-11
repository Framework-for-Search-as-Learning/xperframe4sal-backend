/*
 * Copyright (c) 2026, marcelomachado
 * Licensed under The MIT License [see LICENSE for details]
 */

import {Task} from 'src/modules/task/entities/task.entity';
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
  question_id: string;
}
