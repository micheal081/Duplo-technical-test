import { Module } from '@nestjs/common';

import { DatabaseModule } from './database/database.module';
import { BeeceptorModule } from './providers/beeceptor/beeceptor.module';
import { CreditModule } from './resources/credit/credit.module';
import { OrderModule } from './resources/order/order.module';
import { UserModule } from './resources/user/user.module';

@Module({
  providers: [],
  imports: [DatabaseModule, UserModule, OrderModule, CreditModule, BeeceptorModule],
})
export class AppModule {}
