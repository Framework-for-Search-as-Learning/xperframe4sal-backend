import {forwardRef, Inject, Injectable} from '@nestjs/common';
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
      console.log('passou por aqui 1');
      const {name, title, description, type, questions, experimentId} =
        createSurveyDto;
      const experiment = await this.experimentService.find(experimentId);
      console.log('passou por aqui 2');
      const newSurvey = await this.surveyRepository.create({
        name,
        title,
        description,
        type,
        questions,
        experiment,
      });
      console.log('passou por aqui 3');
      return await this.surveyRepository.save(newSurvey);
    } catch (error) {
      throw error;
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
