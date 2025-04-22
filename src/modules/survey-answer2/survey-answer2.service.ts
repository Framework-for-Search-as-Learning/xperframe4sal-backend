import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {SurveyAnswer} from './entity/survey-answer.entity';
import {Repository} from 'typeorm';
import {CreateSurveyAnswerDto} from './dto/create-surveyAnswer.dto';
import {User2Service} from '../user2/user2.service';
import {Survey2Service} from '../survey2/survey2.service';
import {UpdateSurveyAnswerDto} from './dto/update-surveyAnswer.dto';
import {QuestionType} from '../survey2/dto/question.dto';
import {UserTask2Service} from '../user-task2/user-task2.service';

@Injectable()
export class SurveyAnswer2Service {
  constructor(
    @InjectRepository(SurveyAnswer)
    private readonly surveyAnswerRepository: Repository<SurveyAnswer>,
    private readonly userService: User2Service,
    private readonly surveyService: Survey2Service,
    private readonly userTask2Service: UserTask2Service,
  ) {}

  async create(
    createSurveyAnswerDto: CreateSurveyAnswerDto,
  ): Promise<SurveyAnswer> {
    try {
      const {userId, surveyId, answers} = createSurveyAnswerDto;
      const user = await this.userService.findOne(userId);
      if (!user) {
        throw new NotFoundException('Usuario não encontrado.');
      }
      const survey = await this.surveyService.findOne(surveyId);
      if (!survey) {
        throw new NotFoundException('Survey não encontrado.');
      }

      let totalScore = 0;
      for (const answer of answers) {
        let questionScore = 0;
        if (
          answer.questionType === QuestionType.MULTIPLE_CHOICES ||
          answer.questionType === QuestionType.MULTIPLE_SELECTION
        ) {
          questionScore = answer.selectedOptions?.reduce(
            (acc, option) => acc + option.score,
            0,
          );
        }

        //TODO implementar para verificar as subquestoes
        //if(answer.subAnswer && answer.subAnswer.length > 0)

        answer.score = questionScore;
        totalScore += questionScore;
      }
      const newSurveyAnswer = await this.surveyAnswerRepository.save({
        user: user,
        survey: survey,
        answers: answers,
        score: totalScore,
      });
      const experiment = newSurveyAnswer.survey.experiment;
      if (experiment?.betweenExperimentType === 'rule') {
        await this.userTask2Service.createBySurveyRule({
          userId,
          surveyId: newSurveyAnswer.survey_id,
          surveyAnswer: newSurveyAnswer,
        });
      }
      return newSurveyAnswer;
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<SurveyAnswer[]> {
    return await this.surveyAnswerRepository.find();
  }

  async findByUserId(userId: string): Promise<SurveyAnswer[]> {
    return await this.surveyAnswerRepository.find({
      where: {
        user_id: userId,
      },
    });
  }

  async findByUserIdAndSurveyId(
    userId: string,
    surveyId: string,
  ): Promise<SurveyAnswer> {
    return await this.surveyAnswerRepository.findOne({
      where: {user_id: userId, survey_id: surveyId},
    });
  }

  async removeByUserIdAndSurveyId(userId: string, surveyId: string) {
    return await this.surveyAnswerRepository.delete({
      user_id: userId,
      survey_id: surveyId,
    });
  }

  async remove(id: string) {
    return await this.surveyAnswerRepository.delete({_id: id});
  }

  async update(
    id: string,
    updateSurveyAnswerDto: UpdateSurveyAnswerDto,
  ): Promise<SurveyAnswer> {
    try {
      const {userId, surveyId} = updateSurveyAnswerDto;
      await this.surveyAnswerRepository.update(
        {_id: id},
        //TODO arrumar para incluir outras colunas da tabela
        {user_id: userId, survey_id: surveyId},
      );
      return await this.surveyAnswerRepository.findOne({where: {_id: id}});
    } catch (error) {
      throw error;
    }
  }
}
