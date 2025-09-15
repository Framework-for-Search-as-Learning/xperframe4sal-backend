import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Experiment, StepsType } from './entity/experiment.entity';
import { Repository } from 'typeorm';
import { CreateExperimentDto } from './dto/create-experiment.dto';
//import {Task} from '../task2/entities/task.entity';
//import {UserExperiment} from '../user-experiments2/entities/user-experiments.entity';
import { UserExperiments2Service } from '../user-experiments2/user-experiments2.service';
import { UserTask2Service } from '../user-task2/user-task2.service';
import { UpdateExperimentDto } from './dto/update-experiment.dto';
import { User2Service } from '../user2/user2.service';
import { Task2Service } from '../task2/task2.service';
import { Survey2Service } from '../survey2/survey2.service';
import { Icf2Service } from '../icf2/icf2.service';

@Injectable()
export class Experiments2Service {
  constructor(
    @InjectRepository(Experiment)
    private readonly experimentRepository: Repository<Experiment>,
    @Inject(forwardRef(() => UserExperiments2Service))
    private readonly userExperimentService: UserExperiments2Service,
    private readonly userTaskService: UserTask2Service,
    private readonly userService: User2Service,
    private readonly taskService: Task2Service,
    private readonly surveyService: Survey2Service,
    @Inject(forwardRef(() => Icf2Service))
    private readonly icfService: Icf2Service,
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
    console.log('Survey Props:');
    console.log(surveysProps);
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

    //Create Surveys
    const SurveysPromises = surveysProps.map((survey) => {
      return this.surveyService.create({
        description: survey.description,
        name: survey.name,
        title: survey.title,
        questions: survey.questions,
        type: survey.type,
        experimentId: survey.experimentId,
        uuid: survey.uuid,
      });
    });
    await Promise.all(SurveysPromises);

    //Create Task
    const TasksPromises = tasksProps.map((task) => {
      return this.taskService.create({
        title: task.title,
        summary: task.summary,
        description: task.description,
        search_source: task.search_source,
        search_model: task.search_model,
        survey_id: task.SelectedSurvey,
        rule_type: task.RulesExperiment,
        min_score: task.ScoreThreshold,
        max_score: task.ScoreThresholdmx,
        questionsId: task.selectedQuestionIds,
        experiment_id: savedExperiment._id,
      });
    });
    await Promise.all(TasksPromises);

    //Create Icf
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

  async findWithTasks(id: string): Promise<Experiment> {
    return await this.experimentRepository.findOne({
      where: { _id: id },
      relations: ['tasks'],
    });
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
      step[StepsType.ICF] = { label: 'Aceitar termo de consentimento', order: 1 };
    }

    if (experiment.tasks && experiment.tasks.length > 0) {
      step[StepsType.TASK] = { label: 'Finalizar tarefas de busca', order: 3 };
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
        step[StepsType.PRE] = { label: 'Responder Pre-Questionarios', order: 2 };
      }
      if (hasPost) {
        step[StepsType.POST] = { label: 'Responder Pos-Questionarios', order: 4 };
      }
    }
    return step;
  }

  async exportToYaml(id: string): Promise<string> {
    // Buscar o experimento completo com todas as relações
    const experiment = await this.experimentRepository.findOne({
      where: { _id: id },
      relations: ['tasks', 'surveys', 'icfs'],
    });

    if (!experiment) {
      throw new Error('Experiment not found');
    }

    // Pegar o primeiro ICF (assumindo que há apenas um por experimento)
    const icf = experiment.icfs && experiment.icfs.length > 0 ? experiment.icfs[0] : null;

    // Construir a estrutura do YAML
    const yamlData = {
      experiment: {
        name: experiment.name,
        summary: experiment.summary,
        typeExperiment: experiment.typeExperiment,
        betweenExperimentType: experiment.betweenExperimentType,
      },
      icf: icf ? {
        title: icf.title,
        description: icf.description,
      } : null,
      surveys: experiment.surveys?.map(survey => ({
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
        search_model: task.search_model,
      })) || [],
    };

    // Converter para YAML manualmente (implementação simples)
    return this.convertToYaml(yamlData);
  }

  private convertToYaml(obj: any, indent = 0): string {
    const spaces = '  '.repeat(indent);
    let yaml = '';

    for (const [key, value] of Object.entries(obj)) {
      if (value === null) {
        yaml += `${spaces}${key}: null\n`;
      } else if (Array.isArray(value)) {
        yaml += `${spaces}${key}:\n`;
        if (value.length === 0) {
          yaml += `${spaces}  []\n`;
        } else {
          for (const item of value) {
            yaml += `${spaces}- `;
            if (typeof item === 'object') {
              yaml += '\n';
              yaml += this.convertToYaml(item, indent + 1);
            } else {
              yaml += `${item}\n`;
            }
          }
        }
      } else if (typeof value === 'object') {
        yaml += `${spaces}${key}:\n`;
        yaml += this.convertToYaml(value, indent + 1);
      } else {
        const stringValue = typeof value === 'string' && (value.includes('\n') || value.includes('"'))
          ? `"${value.replace(/"/g, '\\"')}"`
          : value;
        yaml += `${spaces}${key}: ${stringValue}\n`;
      }
    }

    return yaml;
  }

  async importFromYaml(yamlContent: string, ownerId: string): Promise<Experiment> {
    try {
      // Parse do YAML
      const yamlData = this.parseYaml(yamlContent);

      // Validar estrutura básica
      if (!yamlData.experiment) {
        throw new Error('Invalid YAML: missing experiment section');
      }

      const owner = await this.userService.findOne(ownerId);

      // Criar o experimento
      const experiment = await this.experimentRepository.create({
        name: yamlData.experiment.name,
        summary: yamlData.experiment.summary,
        owner_id: ownerId,
        owner,
        typeExperiment: yamlData.experiment.typeExperiment,
        betweenExperimentType: yamlData.experiment.betweenExperimentType,
      });

      const savedExperiment = await this.experimentRepository.save(experiment);

      // Criar ICF se existir
      if (yamlData.icf && yamlData.icf.title && yamlData.icf.description) {
        await this.icfService.create({
          title: yamlData.icf.title,
          description: yamlData.icf.description,
          experimentId: savedExperiment._id,
        });
      }

      // Criar Surveys
      if (yamlData.surveys && Array.isArray(yamlData.surveys)) {
        const surveysPromises = yamlData.surveys.map((survey) => {
          return this.surveyService.create({
            title: survey.title,
            description: survey.description,
            name: survey.title, // usando title como name
            questions: survey.questions || [],
            type: survey.type || 'other',
            experimentId: savedExperiment._id,
            uuid: this.generateUuid(),
          });
        });
        await Promise.all(surveysPromises);
      }

      // Criar Tasks
      if (yamlData.tasks && Array.isArray(yamlData.tasks)) {
        const tasksPromises = yamlData.tasks.map((task) => {
          return this.taskService.create({
            title: task.title,
            summary: task.summary,
            description: task.description,
            search_source: task.search_source || 'google',
            search_model: task.search_model || 'gemini',
            survey_id: null, // pode ser definido depois
            rule_type: task.rule_type || 'score',
            min_score: task.min_score || 0,
            max_score: task.max_score || 10,
            questionsId: [],
            experiment_id: savedExperiment._id,
          });
        });
        await Promise.all(tasksPromises);
      }

      return savedExperiment;
    } catch (error) {
      console.error('Error importing YAML:', error);
      throw new Error(`Failed to import experiment: ${error.message}`);
    }
  }

  private parseYaml(yamlContent: string): any {
    // Parser YAML simples - pode ser substituído por uma biblioteca mais robusta
    try {
      const lines = yamlContent.split('\n');
      const result: any = {};
      let currentSection: any = result;
      let sectionStack: any[] = [result];
      let keyStack: string[] = [];

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;

        const indent = line.length - line.trimStart().length;
        const colonIndex = trimmed.indexOf(':');

        if (colonIndex === -1) continue;

        const key = trimmed.substring(0, colonIndex).trim();
        const value = trimmed.substring(colonIndex + 1).trim();

        // Ajustar stack baseado na indentação
        const level = Math.floor(indent / 2);
        while (keyStack.length > level) {
          keyStack.pop();
          sectionStack.pop();
        }

        currentSection = sectionStack[sectionStack.length - 1];

        if (value === '' || value === 'null') {
          // Seção ou valor nulo
          if (value === 'null') {
            currentSection[key] = null;
          } else {
            currentSection[key] = {};
            sectionStack.push(currentSection[key]);
            keyStack.push(key);
          }
        } else if (value.startsWith('[') && value.endsWith(']')) {
          // Array vazio
          currentSection[key] = [];
        } else if (value.startsWith('"') && value.endsWith('"')) {
          // String com aspas
          currentSection[key] = value.slice(1, -1);
        } else {
          // Valor simples
          currentSection[key] = isNaN(Number(value)) ? value : Number(value);
        }
      }

      return result;
    } catch (error) {
      throw new Error(`Failed to parse YAML: ${error.message}`);
    }
  }

  private generateUuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
