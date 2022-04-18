import * as dotenv from 'dotenv';
dotenv.config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './core/environment';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT || 3000);
  Logger.debug(`🚀  Server is listening on port ${PORT}`);
}

// Start Application
bootstrap().catch((e) => {
  Logger.error(`❌  Error starting server, ${e}`);
  throw e;
});
