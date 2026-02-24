/*
 * Copyright (c) 2026, lapic-ufjf
 * Licensed under The MIT License [see LICENSE for details]
 */

import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Experiment, StepsType } from './entity/experiment.entity';
import { Repository } from 'typeorm';
import { CreateExperimentDto } from './dto/create-experiment.dto';
import { UserExperimentService } from '../user-experiment/user-experiment.service';
import { UserTaskService } from '../user-task/user-task.service';
import { UpdateExperimentDto } from './dto/update-experiment.dto';
import { UserService } from '../user/user.service';
import { TaskService } from '../task/task.service';
import { SurveyService } from '../survey/survey.service';
import { IcfService } from '../icf/icf.service';
import * as yaml from 'js-yaml';
import { ExperimentStatsDto } from './dto/experiment-stats.dto';
import { ExperimentParticipantDto } from './dto/experiment-participant.dto';
import { ExperimentTaskExecutionDto } from './dto/experiment-tasks-execution.dto';
import { ExperimentSurveyStatsDto } from './dto/experiment-surveys-stats.dto';

@Injectable()
export class ExperimentService {
  constructor(
    @InjectRepository(Experiment)
    private readonly experimentRepository: Repository<Experiment>,
    @Inject(forwardRef(() => UserExperimentService))
    private readonly userExperimentService: UserExperimentService,
    private readonly userTaskService: UserTaskService,
    private readonly userService: UserService,
    @Inject(forwardRef(() => TaskService))
    private readonly taskService: TaskService,
    private readonly surveyService: SurveyService,
    @Inject(forwardRef(() => IcfService))
    private readonly icfService: IcfService,
  ) { }

  async create(createExperimentDto: CreateExperimentDto): Promise<any> {
    const {
      name,
      ownerId,
      summary,
      tasksProps,
      surveysProps,
      typeExperiment,
      betweenExperimentType,
      icf,
    } = createExperimentDto;
    const owner = await this.userService.findOne(ownerId);
    const experiment = await this.experimentRepository.create({
      name,
      summary,
      owner_id: ownerId,
      owner,
      typeExperiment,
      betweenExperimentType,
    });
    const savedExperiment = await this.experimentRepository.save(experiment);

    const SurveysPromises = surveysProps.map((survey) => {
      return this.surveyService.create({
        description: survey.description,
        name: survey.name,
        title: survey.title,
        questions: survey.questions,
        type: survey.type,
        experimentId: savedExperiment._id,
        uuid: survey.uuid,
      });
    });
    await Promise.all(SurveysPromises);

    const TasksPromises = tasksProps.map((task) => {
      return this.taskService.create({
        title: task.title,
        summary: task.summary,
        description: task.description,
        search_source: task.search_source,
        survey_id: task.SelectedSurvey,
        rule_type: task.RulesExperiment,
        min_score: task.ScoreThreshold,
        max_score: task.ScoreThresholdmx,
        questionsId: task.selectedQuestionIds,
        experiment_id: savedExperiment._id,
        provider_config: task.provider_config,
      });
    });
    await Promise.all(TasksPromises);

    await this.icfService.create({
      title: icf.title,
      description: icf.description,
      experimentId: savedExperiment._id,
    });
    return savedExperiment;
  }


  async findAll(): Promise<Experiment[]> {
    return await this.experimentRepository.find();
  }

  async find(id: string): Promise<Experiment> {
    return await this.experimentRepository.findOneBy({ _id: id });
  }

  async getStats(id: string): Promise<ExperimentStatsDto> {
    return await this.userExperimentService.getDetailedStats(id);
  }

  async getParticipants(id: string): Promise<ExperimentParticipantDto[]> {
    return await this.userExperimentService.getParticipantsDetails(id);
  }

  async findWithTasks(id: string): Promise<Experiment> {
    return await this.experimentRepository.findOne({
      where: { _id: id },
      relations: ['tasks'],
    });
  }

  async getTasksExecutionDetails(experimentId: string): Promise<ExperimentTaskExecutionDto[]> {
    const userTasks = await this.userTaskService.findByExperimentId(experimentId);

    const grouped = new Map<string, { task: any, executions: any[] }>();

    for (const ut of userTasks) {
      if (!grouped.has(ut.task_id)) {
        grouped.set(ut.task_id, { task: ut.task, executions: [] });
      }
      grouped.get(ut.task_id).executions.push(ut);
    }

    const result: ExperimentTaskExecutionDto[] = [];

    for (const [taskId, data] of grouped) {
      const executionsDetails = await Promise.all(
        data.executions.map(ut => this.userTaskService.getExecutionDetailsFromEntity(ut))
      );

      result.push({
        taskId: taskId,
        taskTitle: data.task.title,
        executions: executionsDetails
      });
    }

    return result;
  }

  async getSurveysStats(experimentId: string): Promise<ExperimentSurveyStatsDto> {
    const surveys = await this.surveyService.findByExperimentId(experimentId);

    const surveysStats = await Promise.all(
      surveys.map(survey => this.surveyService.getStats(survey._id))
    );

    return {
      surveys: surveysStats
    };
  }

  async findOneByName(name: string): Promise<Experiment> {
    return await this.experimentRepository.findOneBy({ name });
  }

  async findByOwnerId(ownerId: string): Promise<Experiment[]> {
    return await this.experimentRepository.find({ where: { owner_id: ownerId } });
  }

  async update(
    id: string,
    updateExperimentDto: UpdateExperimentDto,
  ): Promise<Experiment> {
    try {
      await this.experimentRepository.update({ _id: id }, updateExperimentDto);
      const result = await this.find(id);
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async remove(id: string) {
    const experiment = await this.find(id);
    await this.experimentRepository.delete({ _id: id });
    return experiment;
  }

  async buildStep(experimentId: string): Promise<Record<StepsType, any>> {
    const experiment = await this.experimentRepository.findOne({
      where: { _id: experimentId },
      relations: ['tasks', 'surveys', 'icfs'],
    });
    const step: Record<StepsType, any> = {
      [StepsType.ICF]: undefined,
      [StepsType.PRE]: undefined,
      [StepsType.POST]: undefined,
      [StepsType.TASK]: undefined,
    };
    if (experiment.icfs && experiment.icfs.length > 0) {
      step[StepsType.ICF] = { label: 'accept_icf', order: 1 };
    }

    if (experiment.tasks && experiment.tasks.length > 0) {
      step[StepsType.TASK] = { label: 'end_task', order: 3 };
    }
    if (experiment.surveys.length > 0) {
      let hasPre = false;
      let hasPost = false;
      for (const survey of experiment.surveys) {
        if (survey.type == 'pre') {
          hasPre = true;
        }
        if (survey.type == 'post') {
          hasPost = true;
        }
      }
      if (hasPre) {
        step[StepsType.PRE] = { label: 'answer_pre_survey', order: 2 };
      }
      if (hasPost) {
        step[StepsType.POST] = { label: 'answer_post_survey', order: 4 };
      }
    }
    return step;
  }

  async exportToYaml(id: string): Promise<string> {
    const experiment = await this.experimentRepository.findOne({
      where: { _id: id },
      relations: ['tasks', 'surveys', 'icfs'],
    });

    if (!experiment) {
      throw new Error('Experiment not found');
    }

    const icf = experiment.icfs && experiment.icfs.length > 0 ? experiment.icfs[0] : null;

    const yamlData = {
      experiment: {
        name: experiment.name,
        summary: experiment.summary,
        typeExperiment: experiment.typeExperiment,
        betweenExperimentType: experiment.betweenExperimentType,
        icf: icf ? {
          title: icf.title,
          description: icf.description,
        } : null,
        surveys: experiment.surveys?.map(survey => ({
          name: survey.name,
          title: survey.title,
          description: survey.description,
          questions: survey.questions,
          type: survey.type,
          uniqueAnswer: survey.uniqueAnswer,
          required: survey.required,
        })) || [],
        tasks: experiment.tasks?.map(task => ({
          title: task.title,
          summary: task.summary,
          description: task.description,
          rule_type: task.rule_type,
          max_score: task.max_score,
          min_score: task.min_score,
          search_source: task.search_source,
          survey_id: task.survey_id,
        })) || [],
      }
    };

    return yaml.dump(yamlData)
  }

  async importFromYaml(yamlContent: string, ownerId: string): Promise<string[]> {
    try {
      const yamlData = yaml.load(yamlContent) as any;

      const validationErrors = this.validateYamlObject(yamlData);
      if (validationErrors.length > 0) {
        return validationErrors;
      }

      const owner = await this.userService.findOne(ownerId);

      const experiment = await this.experimentRepository.create({
        name: yamlData.experiment.name,
        summary: yamlData.experiment.summary,
        owner_id: ownerId,
        owner,
        typeExperiment: yamlData.experiment.typeExperiment,
        betweenExperimentType: yamlData.experiment.betweenExperimentType,
      });

      const savedExperiment = await this.experimentRepository.save(experiment);

      if (yamlData.experiment.icf && yamlData.experiment.icf.title) {
        await this.icfService.create({
          title: yamlData.experiment.icf.title,
          description: yamlData.experiment.icf.description || "",
          experimentId: savedExperiment._id,
        });
      }

      if (yamlData.experiment.surveys && Array.isArray(yamlData.experiment.surveys)) {
        const surveysPromises = yamlData.experiment.surveys.map((survey) => {
          const questionsWithIds = (survey.questions || []).map(question => ({
            ...question,
            id: question.id || this.generateUuid()
          }));

          return this.surveyService.create({
            name: survey.name || survey.title,
            title: survey.title,
            description: survey.description,
            questions: questionsWithIds,
            type: survey.type || 'demo',
            experimentId: savedExperiment._id,
            uuid: this.generateUuid(),
          });
        });
        await Promise.all(surveysPromises);
      }

      if (yamlData.experiment.tasks && Array.isArray(yamlData.experiment.tasks)) {
        const tasksPromises = yamlData.experiment.tasks.map((task) => {
          return this.taskService.create({
            title: task.title,
            summary: task.summary,
            description: task.description,
            search_source: task.search_source,
            survey_id: task.survey_id || null,
            rule_type: task.rule_type,
            min_score: task.min_score || 0,
            max_score: task.max_score || 0,
            questionsId: [],
            experiment_id: savedExperiment._id,
          });
        });
        await Promise.all(tasksPromises);
      }

      return [];
    } catch (error) {
      console.error('Error importing YAML:', error);
      throw new Error(`Failed to import experiment: ${error.message}`);
    }
  }

  private generateUuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  private validateYamlObject(yaml: any): string[] {
    const errors: string[] = [];

    if (!yaml.experiment) {
      errors.push('yaml_error_missing_experiment');
      return errors; 
    }

    const experiment = yaml.experiment;

    if (!experiment.name || typeof experiment.name !== 'string' || experiment.name.trim() === '') {
      errors.push('yaml_error_missing_experiment_name');
    }

    if (!experiment.typeExperiment || typeof experiment.typeExperiment !== 'string') {
      errors.push('yaml_error_missing_experiment_type');
    } else if (!['within-subject', 'between-subject'].includes(experiment.typeExperiment)) {
      errors.push('yaml_error_invalid_experiment_type');
    } else if (experiment.typeExperiment == 'between-subject') {
      if (!experiment.betweenExperimentType || typeof experiment.betweenExperimentType !== 'string') {
        errors.push('yaml_error_missing_experiment_between_type');
      } else if (!['random', 'rules_based', 'manual'].includes(experiment.betweenExperimentType)) {
        errors.push('yaml_error_invalid_experiment_between_type');
      }
    }

    if (!experiment.icf) {
      errors.push('yaml_error_missing_icf');
    } else {
      if (!experiment.icf.title || typeof experiment.icf.title !== 'string' || experiment.icf.title.trim() === '') {
        errors.push('yaml_error_missing_icf_title');
      }
    }

    if (!experiment.surveys) {
      errors.push('yaml_error_missing_surveys');
    } else if (!Array.isArray(experiment.surveys)) {
      errors.push('yaml_error_invalid_surveys');
    } else {
      experiment.surveys.forEach((survey, index) => {

        if (!survey.title || typeof survey.title !== 'string' || survey.title.trim() === '') {
          errors.push('yaml_error_missing_survey_title');
        }

        if (!survey.description || typeof survey.description !== 'string' || survey.description.trim() === '') {
          errors.push('yaml_error_missing_survey_description');
        }

        if (!survey.questions) {
          errors.push('yaml_error_missing_surveys_questions');
        } else if (!Array.isArray(survey.questions)) {
          errors.push('yaml_error_invalid_survey_questions');
        } else {
          survey.questions.forEach((question, qIndex) => {
            if (!question.type || typeof question.type !== 'string') {
              errors.push('yaml_error_missing_survey_question_type');
            } else if (!['open', 'multiple-choices', 'multiple-selection'].includes(question.type)) {
              errors.push('yaml_error_invalid_survey_question_type');
            } else if (question.type != 'open') {

              if (!Array.isArray(question.options)) {
                errors.push('yaml_error_missing_survey_question_options');
              }
            }

            if (typeof question.required !== 'boolean') {
              errors.push('yaml_error_missing_survey_question_required');
            }

            if (!question.statement || typeof question.statement !== 'string' || question.statement.trim() === '') {
              errors.push('yaml_error_missing_survey_question_statement');
            }
          });
        }

        if (!survey.type || typeof survey.type !== 'string') {
          errors.push('yaml_error_missing_survey_type');
        } else if (!['pre', 'post', 'demo'].includes(survey.type)) {
          errors.push('yaml_error_invalid_survey_type');
        }

        if (typeof survey.uniqueAnswer !== 'boolean') {
          errors.push('yaml_error_missing_survey_unique_answer');
        }

        if (typeof survey.required !== 'boolean') {
          errors.push('yaml_error_missing_survey_required');
        }
      });
    }

    if (!experiment.tasks) {
      errors.push('yaml_error_missing_tasks');
    } else if (!Array.isArray(experiment.tasks)) {
      errors.push('yaml_error_invalid_tasks');

    } else {
      experiment.tasks.forEach((task, index) => {
        if (!task.title || typeof task.title !== 'string' || task.title.trim() === '') {
          errors.push('yaml_error_missing_tasks_title');
        }

        if (!task.summary || typeof task.summary !== 'string' || task.summary.trim() === '') {
          errors.push('yaml_error_missing_tasks_summary');
        }

        if (experiment.betweenExperimentType == 'rules_based') {
          if (!task.rule_type || typeof task.rule_type !== 'string') {
            errors.push('yaml_error_missing_tasks_rule_type');
          } else if (!['score', 'question'].includes(task.rule_type)) {
            errors.push('yaml_error_invalid_tasks_rule_type');
          }

          if (typeof task.max_score !== 'number') {
            errors.push('yaml_error_missing_tasks_max_score');
          }
        }

        if (!task.search_source || typeof task.search_source !== 'string') {
          errors.push('yaml_error_missing_tasks_search_source');
        } else if (!['search-engine', 'llm'].includes(task.search_source)) {
          errors.push('yaml_error_invalid_tasks_search_source');
        }

      });
    }

    return errors;
  }


  async getGeneralExpirementInfos(experiment_id: string) {
    const experiment = await this.experimentRepository.findOneBy({ _id: experiment_id });
    const userExperimentInfos = await this.userExperimentService.countUsersByExperimentId(experiment_id);
    return {
      experimentStatus: experiment.status,
      userExperimentInfos
    };
  }
}