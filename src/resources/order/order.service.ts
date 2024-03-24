import { Injectable } from '@nestjs/common';
import { Order } from '@prisma/postgres/client';

import { UserService } from '../user/user.service';

import { NewOrderDto } from './dto/new-order-dto';
import { OrderData } from './types';

import { MongoPrismaService } from '@/database/mongo-prisma.service';
import { PostgresPrismaService } from '@/database/postgres-prisma.service';

@Injectable()
export class OrderService {
  constructor(
    private readonly userService: UserService,
    private readonly mongoPrisma: MongoPrismaService,
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
