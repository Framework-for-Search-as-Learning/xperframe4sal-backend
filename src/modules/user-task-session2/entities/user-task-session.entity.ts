import {BaseEntity} from 'src/model/base_entity2';
import {Column, Entity} from 'typeorm';

@Entity()
export class UserTaskSession extends BaseEntity {
  //TODO Relation with Task
  //TODO Relation with user
  @Column()
  query: string;
  @Column()
  timestamp: Date;
  @Column({default: 1})
  serpNumber: number;

  //TODO pages
}
