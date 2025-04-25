import {BaseEntity} from 'src/model/base_entity2';
import {Experiment} from 'src/modules/experiments2/entity/experiment.entity';
import {Column, Entity, OneToMany} from 'typeorm';

@Entity()
export class Icf extends BaseEntity {
  @Column()
  title: string;
  @Column()
  description: string;
  /* 
  @Column()
  researchTitle: string;
  @Column()
  agreementStatement: string;
  @Column()
  description: string;
  //TODO ver como fazer no postgres
  //@Column()
  //researchers: string[];
  @Column()
  contact: string;
  */
  @OneToMany(() => Experiment, (experiment) => experiment.icf, {cascade: true})
  experiments: Experiment[];
}
