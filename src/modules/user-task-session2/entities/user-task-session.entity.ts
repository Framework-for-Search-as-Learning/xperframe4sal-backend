import {BaseEntity} from 'src/model/base_entity2';
import {Column, Entity, OneToMany} from 'typeorm';
import {Page} from './page.entity';

@Entity()
export class UserTaskSession extends BaseEntity {
  //TODO Relation with Task
  @OneToMany(() => Page, (page) => page.session)
  pages: Page[];
  //TODO Relation with user
  @Column()
  query: string;
  @Column()
  timestamp: Date;
  @Column({default: 1})
  serpNumber: number;

  //TODO pages
}
