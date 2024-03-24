import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerModule } from 'nestjs-pino';

import { DatabaseModule } from './database/database.module';
import { loggerModuleAsyncParams, validate } from './env';
import { BeeceptorModule } from './providers/beeceptor/beeceptor.module';
import { HashModule } from './providers/hash/hash.module';
import { CreditModule } from './resources/credit/credit.module';
import { OrderModule } from './resources/order/order.module';
import { UserModule } from './resources/user/user.module';

import { ENV } from '@/app.environment';

@Module({
  providers: [],
  imports: [
    LoggerModule.forRootAsync(loggerModuleAsyncParams),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `../.env`,
      validate,
    }),
    MongooseModule.forRoot(ENV.MONGO_DATABASE_URL),
    DatabaseModule,
    UserModule,
    OrderModule,
    CreditModule,
    HashModule,
    BeeceptorModule,
  ],
})
export class AppModule {}
