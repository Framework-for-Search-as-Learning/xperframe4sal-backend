import { Injectable } from '@nestjs/common';
import { Survey } from 'src/model/survey.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class SurveysService {
  constructor(
    @InjectModel('Surveys')
    private readonly _surveyModel: Model<Survey>,
  ) { }

  async create(survey: Survey): Promise<Survey> {
    try {
      const newSurvey = new this._surveyModel(survey);
      return await newSurvey.save();
    } catch (error) {
      throw error
    }
  }

  async findAll(): Promise<Survey[]> {
    return await this._surveyModel.find().exec()
  }

  async find(id: string): Promise<Survey> {
    return await this._surveyModel.findById(id);
  }

  async update(id: string, survey: Survey): Promise<Survey> {
    return await this._surveyModel.findByIdAndUpdate(id, survey, {
      new: true,
    });
  }

  async remove(id: string) {
    return await this._surveyModel.findByIdAndDelete(id).exec();
  }
}
