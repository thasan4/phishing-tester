import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { configService } from '@shared/config/config.service';
import * as bodyParser from 'body-parser';
import helmet from 'helmet';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe(configService.getValidationOptions(true)),
  );

  app.use(helmet());
  app.use(bodyParser.json({ limit: '50mb' }));

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  });

  app.setGlobalPrefix('/api');
  await app.listen(3000);
}
bootstrap();
