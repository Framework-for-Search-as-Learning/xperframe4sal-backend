import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Icf} from './entity/icf.entity';
import {Repository} from 'typeorm';
import {CreateIcfDto} from './dto/create-survey.dto';
import {UpdateIcfDto} from './dto/update-survey.dto';

@Injectable()
export class Icf2Service {
  constructor(
    @InjectRepository(Icf)
    private readonly icfRepository: Repository<Icf>,
  ) {}

  async create(createIcfDto: CreateIcfDto): Promise<Icf> {
    return await this.icfRepository.save(createIcfDto);
  }
  async findAll(): Promise<Icf[]> {
    return await this.icfRepository.find();
  }
  async find(id: string): Promise<Icf> {
    return await this.icfRepository.findOne({where: {_id: id}});
  }

  //TODO ver oque fazer
  //async findOneByExperimentId

  async update(id: string, updateIcfDto: UpdateIcfDto): Promise<Icf> {
    try {
      await this.icfRepository.update({_id: id}, updateIcfDto);
      return await this.find(id);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string): Promise<Icf> {
    const icf = await this.find(id);
    await this.icfRepository.delete({_id: id});
    return icf;
  }
}
