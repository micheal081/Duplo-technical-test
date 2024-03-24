import { Module } from '@nestjs/common';

import { UserModule } from '../user/user.module';

import { OrderController } from './order.controller';
import { OrderService } from './order.service';

import { DatabaseModule } from '@/database/database.module';

@Module({
  imports: [UserModule, DatabaseModule],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
