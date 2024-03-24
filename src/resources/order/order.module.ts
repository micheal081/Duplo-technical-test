import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserModule } from '../user/user.module';

import { TransactionSchema } from './mongo-schemas/transaction.schema';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

import { DatabaseModule } from '@/database/database.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Transaction', schema: TransactionSchema }]),
    UserModule,
    DatabaseModule,
  ],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
