import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LlmMessage } from './llm-message.entity';
import { Task } from 'src/modules/task2/entities/task.entity';
import { User } from 'src/modules/user2/entity/user.entity';

@Entity('llm_sessions')
export class LlmSession {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.llmSessions, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Task, (task) => task.llmSessions, { onDelete: 'CASCADE' })
  task: Task;

  // Relacionamento renomeado para ser explícito
  @OneToMany(() => LlmMessage, (msg) => msg.session, { cascade: true })
  messages: LlmMessage[];
}
