import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express';
import { resolve } from 'path';
import { AppModule } from './app.module';

const PORT = Number(process.env.APP_PORT) || 3333;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.use('/files', express.static(resolve(__dirname, '..', 'uploads')));
  await app.listen(PORT);
}
bootstrap();
