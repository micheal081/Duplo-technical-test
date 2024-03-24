import { randomUUID } from 'crypto';

import { ValidationPipe, VersioningOptions, VersioningType } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DocumentBuilder, OpenAPIObject } from '@nestjs/swagger';
import { plainToInstance, Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumber, IsString, validateSync } from 'class-validator';
import { LoggerModuleAsyncParams } from 'nestjs-pino';
import stdSerializers from 'pino-std-serializers';

const CORRELATION_ID_HEADER = 'x-correlation-id';
const SECRET_HEADER = 'x-secret-key';

export const appValidationPipe = new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  forbidUnknownValues: true,
  transform: true,
});

export const appVersioningOptions: VersioningOptions = {
  type: VersioningType.URI,
  defaultVersion: '1',
};

export const swaggerConfig = (appName: string): Omit<OpenAPIObject, 'paths'> =>
  new DocumentBuilder()
    .setTitle(appName)
    .setDescription(`${appName} API description`)
    .setVersion('1.0')
    .addTag(appName)
    .addApiKey({ type: 'apiKey', in: 'header', name: SECRET_HEADER }, SECRET_HEADER)
    .build();

export const loggerModuleAsyncParams: LoggerModuleAsyncParams = {
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    pinoHttp: {
      genReqId(req, res) {
        const corrId = req.headers[CORRELATION_ID_HEADER] ?? randomUUID();
        res.setHeader(CORRELATION_ID_HEADER, corrId);

        return corrId;
      },
      name: configService.get('APPLICATION'),
      level: process.env.LOG_LEVEL || 'info',
      transport: configService.get('USE_PRETTY_LOGS')
        ? {
            target: 'pino-pretty',
            options: {
              colorize: true,
              translateTime: "yyyy-mm-dd'T'HH:MM:ss.l'Z'",
              messageFormat: '{correlationId: req.headers.x-correlation-id} [{context}] {msg}',
              errorLikeObjectKeys: ['err', 'error'],
            },
          }
        : undefined,
      useLevelLabels: true,
      serializers: stdSerializers,
    },
  }),
  inject: [ConfigService],
};

interface IValue {
  value: string | undefined;
}

const NumberTransform = (): PropertyDecorator => Transform(({ value }: IValue) => value && parseInt(value, 10));

const BooleanTransform = (): PropertyDecorator =>
  Transform(({ value }: IValue) => [true, 'true', '1', 1].includes(value));

export class EnvironmentVariables {
  @IsString()
  @IsNotEmpty()
  public NODE_ENV: string;

  @NumberTransform()
  @IsNumber()
  @IsNotEmpty()
  public PORT: number;

  @IsString()
  @IsNotEmpty()
  public APPLICATION: string;

  @BooleanTransform()
  @IsBoolean()
  @IsNotEmpty()
  public OTEL_ENABLED: boolean;

  @IsString()
  @IsNotEmpty()
  public JWT_SECRET_KEY: string;

  @IsString()
  @IsNotEmpty()
  public POSTGRES_DATABASE_URL: string;

  @IsString()
  @IsNotEmpty()
  public MONGO_DATABASE_URL: string;
}

export function validate(config: Record<string, unknown>): EnvironmentVariables {
  const validatedConfig = plainToInstance(EnvironmentVariables, config);
  const errors = validateSync(validatedConfig, { skipMissingProperties: false });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}
