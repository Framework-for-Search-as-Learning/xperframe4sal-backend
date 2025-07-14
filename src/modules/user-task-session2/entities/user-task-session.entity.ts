import {BaseEntity} from 'src/model/base_entity2';
import {Column, Entity, ManyToOne, OneToMany} from 'typeorm';
import {Page} from './page.entity';
import {Task} from 'src/modules/task2/entities/task.entity';
import {User} from 'src/modules/user2/entity/user.entity';

@Entity()
export class UserTaskSession extends BaseEntity {
  @ManyToOne(() => Task, (task) => task.sessions)
  task: Task;
  @Column()
  task_id: string;

  @ManyToOne(() => User, (user) => user.sessions)
  user: User;
  @Column()
  user_id: string;

  @OneToMany(() => Page, (page) => page.session)
  pages: Page[];
  @Column()
  query: string;

  @Column()
  timestamp: Date;

  @Column({default: 1})
  serpNumber: number;
}
