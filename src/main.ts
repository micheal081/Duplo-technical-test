import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';

import { AppModule } from './app.module';
import { httpOptions } from './config/httpAdapter';
import otelSdk from './config/tracer/otel-tracer';
import { MongoPrismaService } from './database/mongo-prisma.service';
import { PostgresPrismaService } from './database/postgres-prisma.service';

import { ENV, Environment } from '@/app.environment';
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any */

async function bootstrap(): Promise<void> {
  // Open Telemetry SDK initialization
  if (ENV.OTEL_ENABLED === true) {
    otelSdk.start();
  }

  // App instance
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(httpOptions), {
    bufferLogs: true,
  });

  // Bind Logger
  app.useLogger(app.get(Logger));
  app.flushLogs();

  // Bind fastify middlewares
  await app.register(helmet as any);
  await app.register(cors as any);

  // Bind global Pipes
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: ENV.NODE_ENV === Environment.Production,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Init Swagger docs
  if (ENV.NODE_ENV !== Environment.Production) {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('Duplo Technical Test API')
      .setDescription('Example docs')
      .setVersion('v1')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('swagger', app, document);
  }

  // Starts listening for shutdown hooks
  if (ENV.NODE_ENV === Environment.Production) {
    app.enableShutdownHooks();
    app.get(PostgresPrismaService);
    app.get(MongoPrismaService);
    app.enableShutdownHooks();
  }

  await app.listen(ENV.PORT, '0.0.0.0');
}

bootstrap().catch(console.error);
