import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from '@prisma/postgres/client';
import * as mongoose from 'mongoose';

import { UserService } from '../user/user.service';

import { NewOrderDto } from './dto/new-order-dto';
import { Transaction } from './mongo-schemas/transaction.schema';
import { OrderData } from './types';

import { PostgresPrismaService } from '@/database/postgres-prisma.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Transaction.name)
    private transaction: mongoose.Model<Transaction>,
    private readonly userService: UserService,
    private readonly postgresPrisma: PostgresPrismaService,
  ) {}

  async saveOrder(userId: string, payload: NewOrderDto): Promise<Partial<Order>> {
    const user = await this.userService.getUserById(userId);

    const { customerName, productId, productName, quantity, pricePerUnit, totalPrice, shippingAddress, status } =
      payload;

    const orderData: OrderData = {
      userId,
      businessName: user.name,
      customerName,
      productName,
      quantity,
      pricePerUnit,
      totalPrice,
      shippingAddress,
      status,
    };

    if (productId) {
      orderData.productId = productId;
    }

    await this.transaction.create(orderData);

    return this.postgresPrisma.order.create({
      data: orderData,
      select: {
        id: true,
        customerName: true,
        productName: true,
      },
    });
  }
}
