import {
  BadRequestException,
  Module,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { HealthController } from './health.controller';
import { TerminusModule } from '@nestjs/terminus';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppResolver } from './app.resolver';
import { CustomExceptionsFilter } from './core/utility';
import * as ormconfig from './core/config/typeorm';
import { EmailModule } from './app/email/email.module';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), TerminusModule, EmailModule],
  controllers: [HealthController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: CustomExceptionsFilter,
    },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        exceptionFactory: (error: ValidationError[]) =>
          new BadRequestException(error),
      }),
    },
    AppResolver,
  ],
})
export class AppModule {}
