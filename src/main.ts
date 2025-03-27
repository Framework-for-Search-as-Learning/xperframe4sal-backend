import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from '@nestjs/common';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  const config = new DocumentBuilder()
    .setTitle('Cognitive Bias')
    .setDescription('The Cognitive Bias Framework API')
    .setVersion('1.0')
    .addTag('CognitiveBias')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  app.setGlobalPrefix('searching-as-learning');
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(
    process.env.PORT ? Number(process.env.PORT) : 3000,
    async () => console.log(`Application is running on: ${await app.getUrl()}`),
  );
}
bootstrap();
