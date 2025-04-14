import {
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Survey} from './entity/survey.entity';
import {Repository} from 'typeorm';
import {CreateSurveyDto} from './dto/create-survey.dto';
import {UpdateSurveyDto} from './dto/update-survey.dto';
import {Experiments2Service} from '../experiments2/experiments2.service';

@Injectable()
export class Survey2Service {
  constructor(
    @InjectRepository(Survey)
    private readonly surveyRepository: Repository<Survey>,
    @Inject(forwardRef(() => Experiments2Service))
    private readonly experimentService: Experiments2Service,
  ) {}

  async create(createSurveyDto: CreateSurveyDto): Promise<Survey> {
    try {
      const {name, title, description, type, questions, experimentId, uuid} =
        createSurveyDto;
      const experiment = await this.experimentService.find(experimentId);
      if (!experiment) {
        throw new NotFoundException('Experimento não encontrado');
      }
      let newSurvey: Survey;
      console.log('uuid gerada: ', uuid);
      if (uuid) {
        newSurvey = await this.surveyRepository.create({
          _id: uuid,
          name,
          title,
          description,
          type,
          questions,
          experiment,
        });
      } else {
        newSurvey = await this.surveyRepository.create({
          name,
          title,
          description,
          type,
          questions,
          experiment,
        });
      }
      return await this.surveyRepository.save(newSurvey);
    } catch (error) {
      console.error('Erro ao criar survey:', error);
      throw new InternalServerErrorException('Erro ao criar survey');
    }
  }

  async findAll(): Promise<Survey[]> {
    return await this.surveyRepository.find();
  }
  async findOne(id: string): Promise<Survey> {
    return await this.surveyRepository.findOne({
      where: {_id: id},
    });
  }
  async findByExperimentId(experimentId: string): Promise<Survey[]> {
    return await this.surveyRepository.find({
      where: {
        experiment: {_id: experimentId},
      },
    });
  }
  async update(id: string, updateSurveyDto: UpdateSurveyDto): Promise<Survey> {
    try {
      await this.surveyRepository.update({_id: id}, updateSurveyDto);
      return await this.findOne(id);
    } catch (error) {
      throw error;
    }
  }
  async remove(id: string) {
    const survey = await this.findOne(id);
    await this.surveyRepository.delete({_id: id});
    return survey;
  }
}
