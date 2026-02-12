/*
 * Copyright (c) 2026, lapic-ufjf
 * Licensed under The MIT License [see LICENSE for details]
 */

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
import {ExperimentsService} from '../experiments/experiments.service';

@Injectable()
export class SurveyService {
  constructor(
    @InjectRepository(Survey)
    private readonly surveyRepository: Repository<Survey>,
    @Inject(forwardRef(() => ExperimentsService))
    private readonly experimentService: ExperimentsService,
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
      if (uuid) {
        newSurvey = this.surveyRepository.create({
          _id: uuid,
          name,
          title,
          description,
          type,
          questions,
          experiment,
        });
      } else {
        newSurvey = this.surveyRepository.create({
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

  async findOneWithExperiment(id: string): Promise<Survey> {
    return await this.surveyRepository.findOne({
      where: {_id: id},
      relations: ['experiment'],
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
      console.error(error);
      throw error;
    }
  }
  async remove(id: string) {
    const survey = await this.findOne(id);
    await this.surveyRepository.delete({_id: id});
    return survey;
  }
}
