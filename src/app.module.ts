import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { BeeceptorModule } from './providers/beeceptor/beeceptor.module';
import { CreditModule } from './resources/credit/credit.module';
import { OrderModule } from './resources/order/order.module';
import { UserModule } from './resources/user/user.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [DatabaseModule, UserModule, OrderModule, CreditModule, BeeceptorModule],
})
export class AppModule {}
