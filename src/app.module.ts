import { Module } from '@nestjs/common';

import { DatabaseModule } from './database/database.module';
import { BeeceptorModule } from './providers/beeceptor/beeceptor.module';
import { HashModule } from './providers/hash/hash.module';
import { CreditModule } from './resources/credit/credit.module';
import { OrderModule } from './resources/order/order.module';
import { UserModule } from './resources/user/user.module';

@Module({
  providers: [],
  imports: [DatabaseModule, UserModule, OrderModule, CreditModule, HashModule, BeeceptorModule],
})
export class AppModule {}
