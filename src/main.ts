import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

const port = process.env.PORT || 5000;

async function start() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ enableDebugMessages: true }));
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(port, () => console.log(`Server is running on port ${port}`));
}

start();
