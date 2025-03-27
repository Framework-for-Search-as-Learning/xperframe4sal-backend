import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SurveyAnswers } from 'src/model/survey-answer.entity';


@Injectable()
export class UserSurveysService {
  constructor(
    @InjectModel('SurveyAnswers')
    private readonly surveyAnswerModel: Model<SurveyAnswers>,
  ) { }

  async create(surveyAnswer: SurveyAnswers): Promise<SurveyAnswers> {
    const newUserSurvey = new this.surveyAnswerModel(surveyAnswer);
    return await newUserSurvey.save();
  }

  async findAll(): Promise<SurveyAnswers[]> {
    return await this.surveyAnswerModel.find().exec();
  }

  async findByUserId(userId: string): Promise<SurveyAnswers[]> {
    return await this.surveyAnswerModel.find({ userId: userId }).exec();
  }
  async findByUserIdAndSurveyId(
    userId: string,
    surveyId: string
  ): Promise<SurveyAnswers[]> {
    return await this.surveyAnswerModel.find(
      { userId: userId, surveyId: surveyId }
    ).exec();
  }

  async removeByUserIdAndSurveyId(userId: string, surveyId: string) {
    return await this.surveyAnswerModel.findOneAndDelete(
      { userId: userId, surveyId: surveyId }
    ).exec();
  }

  async remove(id: string) {
    return await this.surveyAnswerModel.findByIdAndDelete(id).exec();
  }

  async update(id: string, surveyAnswer: SurveyAnswers): Promise<SurveyAnswers> {
    return await this.surveyAnswerModel.findByIdAndUpdate(id, surveyAnswer, {
      new: true,
    }).exec();
  }
}
