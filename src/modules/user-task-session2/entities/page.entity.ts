import {BaseEntity} from 'src/model/base_entity2';
import {Column, Entity, ManyToOne} from 'typeorm';
import {UserTaskSession} from './user-task-session.entity';

@Entity()
export class Page extends BaseEntity {
  @ManyToOne(() => UserTaskSession, (session) => session.pages)
  session: UserTaskSession;
  @Column()
  session_id: string;
  @Column()
  title: string;
  @Column()
  url: string;
  @Column()
  startTime: Date;
  @Column()
  endTime: Date;

  //Position || SerpNumber
}
