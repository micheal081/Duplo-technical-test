import * as dotenv from 'dotenv';
import { get } from 'env-var';

dotenv.config();

export enum Environment {
  Local = 'local',
  Development = 'development',
  Staging = 'staging',
  Production = 'production',
}

export const ENV = {
  NODE_ENV: get('NODE_ENV').required().asEnum<Environment>(Object.values(Environment)),
  PORT: get('PORT').default(3000).asPortNumber(),
  OTEL_ENABLED: get('OTEL_ENABLED').default(0).asBool(),
  JWT_SECRET_KEY: get('JWT_SECRET_KEY').asString(),
};
