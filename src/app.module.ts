/*
 * Copyright (c) 2026, lapic-ufjf
 * Licensed under The MIT License [see LICENSE for details]
 */

import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AuthModule} from './modules/auth/auth.module';
import {HttpModule} from './modules/http/http.module';
import {GoogleModule} from './modules/search-engines/google/google.module';
import {MailerModule} from '@nestjs-modules/mailer';
import {ConfigModule} from '@nestjs/config';
import {ConfigService} from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserModule} from './modules/user/user.module';
import {User} from './modules/user/entity/user.entity';
import {ExperimentModule} from './modules/experiment/experiment.module';
import {Experiment} from './modules/experiment/entity/experiment.entity';
import {TaskModule} from './modules/task/task.module';
import {UserExperimentModule} from './modules/user-experiment/user-experiment.module';
import {UserExperiment} from './modules/user-experiment/entities/user-experiments.entity';
import {UserTaskModule} from './modules/user-task/user-task.module';
import {UserTask} from './modules/user-task/entities/user-tasks.entity';
import {SurveyModule} from './modules/survey/survey.module';
import {Survey} from './modules/survey/entity/survey.entity';
import {SurveyAnswerModule} from './modules/survey-answer/survey-answer.module';
import {SurveyAnswer} from './modules/survey-answer/entity/survey-answer.entity';
import {TaskQuestionMapModule} from './modules/task-question-map/task-question-map.module';
import {TaskQuestionMap} from './modules/task-question-map/entity/taskQuestionMap.entity';
import {IcfModule} from './modules/icf/icf.module';
import {Icf} from './modules/icf/entity/icf.entity';
import {UserTaskSessionModule} from './modules/user-task-session/user-task-session.module';
import {UserTaskSession} from './modules/user-task-session/entities/user-task-session.entity';
import {Page} from './modules/user-task-session/entities/page.entity';
import {LlmSessionModule} from './modules/llm-session/llm-session.module';
import {LlmSession} from './modules/llm-session/entity/llm-session.entity';
import {LlmMessage} from './modules/llm-session/entity/llm-message.entity';
import {Task} from './modules/task/entities/task.entity';
import * as Joi from 'joi';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DB_TYPE: Joi.string()
          .required()
          .valid('postgres', 'mysql', 'mariadb', 'mssql', 'oracle', 'sqlite')
          .default('postgres'),
        DB_USER: Joi.string().required().default('pgadmin'),
        DB_PASSWORD: Joi.string().required().default('pgadmin'),
        DB_HOST: Joi.string().required().default('localhost'),
        DB_PORT: Joi.number().required().default(5432),
        DB_NAME: Joi.string().required().default('sal'),
        PORT: Joi.number().required().default(3000),
        SECRET: Joi.string().required(),
      }),
    }),
    AuthModule,
    HttpModule,
    GoogleModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: configService.getOrThrow<
          'postgres' | 'mysql' | 'mariadb' | 'mssql' | 'oracle' | 'sqlite'
        >('DB_TYPE'),
        host: configService.getOrThrow<string>('DB_HOST'),
        port: configService.getOrThrow<number>('DB_PORT'),
        username: configService.getOrThrow<string>('DB_USER'),
        password: configService.getOrThrow<string>('DB_PASSWORD'),
        database: configService.getOrThrow<string>('DB_NAME'),
        entities: [
          User,
          Experiment,
          Task,
          Survey,
          UserExperiment,
          UserTask,
          SurveyAnswer,
          TaskQuestionMap,
          Icf,
          UserTaskSession,
          Page,
          LlmSession,
          LlmMessage,
        ],
        synchronize: true,
      }),
    }),
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        auth: {
          type: 'OAuth2',
        },
      },
    }),
    UserModule,
    ExperimentModule,
    TaskModule,
    UserExperimentModule,
    UserTaskModule,
    SurveyModule,
    SurveyAnswerModule,
    TaskQuestionMapModule,
    IcfModule,
    UserTaskSessionModule,
    LlmSessionModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
