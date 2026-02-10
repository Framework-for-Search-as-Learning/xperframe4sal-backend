import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { HttpModule } from './modules/http/http.module';
import { GoogleModule } from './modules/search-engines/google/google.module';
import { PuppeteerModule } from './modules/puppeteer/puppeteer.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { User } from './modules/user/entity/user.entity';
import { ExperimentModule } from './modules/experiment/experiment.module';
import { Experiment } from './modules/experiment/entity/experiment.entity';
import { TaskModule } from './modules/task/task.module';
import { UserExperimentModule } from './modules/user-experiment/user-experiment.module';
import { UserExperiment } from './modules/user-experiment/entities/user-experiments.entity';
import { UserTaskModule } from './modules/user-task/user-task.module';
import { UserTask } from './modules/user-task/entities/user-tasks.entity';
import { SurveyModule } from './modules/survey/survey.module';
import { Survey } from './modules/survey/entity/survey.entity';
import { SurveyAnswerModule } from './modules/survey-answer/survey-answer.module';
import { SurveyAnswer } from './modules/survey-answer/entity/survey-answer.entity';
import { TaskQuestionMapModule } from './modules/task-question-map/task-question-map.module';
import { TaskQuestionMap } from './modules/task-question-map/entity/taskQuestionMap.entity';
import { IcfModule } from './modules/icf/icf.module';
import { Icf } from './modules/icf/entity/icf.entity';
import { UserTaskSessionModule } from './modules/user-task-session/user-task-session.module';
import { UserTaskSession } from './modules/user-task-session/entities/user-task-session.entity';
import { Page } from './modules/user-task-session/entities/page.entity';
import { LlmSessionModule } from './llm-session/llm-session.module';
import { LlmSession } from './llm-session/entity/llm-session.entity';
import { LlmMessage } from './llm-session/entity/llm-message.entity';
import { Task } from './modules/task/entities/task.entity';
@Module({
  imports: [
    ConfigModule.forRoot({
      //isso é para o funcionamento do set SECRET no .env
      isGlobal: true,
    }),
    AuthModule,
    HttpModule,
    GoogleModule,
    PuppeteerModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST ? process.env.POSTGRES_HOST : 'localhost',
      port: 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: 'cbf',
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
        LlmMessage
      ],
      synchronize: true,
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
export class AppModule { }
