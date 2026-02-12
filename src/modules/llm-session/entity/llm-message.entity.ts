import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LlmSession } from './llm-session.entity';

@Entity('llm_messages')
export class LlmMessage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  content: string;

  @Column()
  role: 'user' | 'model'; // Aqui fica claro que é IA

  @ManyToOne(() => LlmSession, (session) => session.messages, {
    onDelete: 'CASCADE',
  })
  session: LlmSession;

  @CreateDateColumn()
  createdAt: Date;
}
