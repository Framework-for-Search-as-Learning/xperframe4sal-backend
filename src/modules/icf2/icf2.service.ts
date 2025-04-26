import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Icf} from './entity/icf.entity';
import {Repository} from 'typeorm';
import {CreateIcfDto} from './dto/create-icf.dto';
import {UpdateIcfDto} from './dto/update-icf.dto';
import {Experiments2Service} from '../experiments2/experiments2.service';

@Injectable()
export class Icf2Service {
  constructor(
    @InjectRepository(Icf)
    private readonly icfRepository: Repository<Icf>,
    @Inject(forwardRef(() => Experiments2Service))
    private readonly experimentService: Experiments2Service,
  ) {}

  async create(createIcfDto: CreateIcfDto): Promise<Icf> {
    const experiment = await this.experimentService.find(
      createIcfDto.experimentId,
    );
    if (!experiment) {
      throw new NotFoundException('Experimento não encontrado');
    }
    return await this.icfRepository.save({
      title: createIcfDto.title,
      description: createIcfDto.description,
      experiment,
    });
  }
  async findAll(): Promise<Icf[]> {
    return await this.icfRepository.find();
  }
  async find(id: string): Promise<Icf> {
    return await this.icfRepository.findOne({where: {_id: id}});
  }

  async findOneByExperimentId(experimentId: string): Promise<Icf> {
    try {
      return await this.icfRepository.findOne({
        where: {experiment_id: experimentId},
      });
    } catch (error) {}
  }

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
