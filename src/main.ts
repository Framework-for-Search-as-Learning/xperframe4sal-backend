/*
 * Copyright (c) 2026, lapic-ufjf
 * Licensed under The MIT License [see LICENSE for details]
 */

import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from '@nestjs/common';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {ConfigService} from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  const configService = app.get(ConfigService);
  const config = new DocumentBuilder()
    .setTitle('Searchat Behavior')
    .setDescription('The Searchat Behavior API documentation')
    .setVersion('1.0')
    .addTag('SearchatBehavior')
    .addBearerAuth({type: 'http', scheme: 'bearer', bearerFormat: 'JWT'}, 'jwt')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  app.setGlobalPrefix('searchat-behavior');
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(configService.getOrThrow<number>('PORT'), async () =>
    console.log(`Application is running on: ${await app.getUrl()}`),
  );
}
bootstrap();
