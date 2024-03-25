import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from '@prisma/client';
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

  async getOrderById(id: string, userId: string): Promise<Partial<Order>> {
    return this.postgresPrisma.order.findUnique({
      where: {
        id,
        userId,
        deletedAt: null,
      },
      select: {
        businessName: true,
        customerName: true,
        productId: true,
        productName: true,
        quantity: true,
        pricePerUnit: true,
        totalPrice: true,
        shippingAddress: true,
        status: true,
        createdAt: true,
      },
    });
  }

  async getOrderDetailsForToday(userId: string, skip: number, take: number): Promise<Partial<Order>[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to the beginning of the day

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1); // Get the date for tomorrow

    const orders = await this.postgresPrisma.order.findMany({
      where: {
        userId,
        createdAt: {
          gte: today,
          lt: tomorrow,
        },
        deletedAt: null,
      },
      select: {
        businessName: true,
        customerName: true,
        productId: true,
        productName: true,
        quantity: true,
        pricePerUnit: true,
        totalPrice: true,
        shippingAddress: true,
        status: true,
        createdAt: true,
      },
      skip,
      take,
    });

    return orders;
  }

  async getOverallOrderDetails(userId: string, skip: number, take: number): Promise<Partial<Order>[]> {
    const orders = await this.postgresPrisma.order.findMany({
      where: {
        userId,
        deletedAt: null,
      },
      select: {
        businessName: true,
        customerName: true,
        productId: true,
        productName: true,
        quantity: true,
        pricePerUnit: true,
        totalPrice: true,
        shippingAddress: true,
        status: true,
        createdAt: true,
      },
      skip,
      take,
    });

    return orders;
  }

  async getTotalNumberForToday(userId: string): Promise<number> {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to the beginning of the day

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1); // Get the date for tomorrow

    return this.postgresPrisma.order.count({
      where: {
        userId,
        createdAt: {
          gte: today,
          lt: tomorrow,
        },
        deletedAt: null,
      },
    });
  }

  async getOverallNumber(userId: string): Promise<number> {
    return this.postgresPrisma.order.count({
      where: {
        userId,
        deletedAt: null,
      },
    });
  }

  async calculateCreditScore(userId: string): Promise<number> {
    // Retrieve all orders for the given user
    const orders = await this.transaction.find({ userId });

    // Calculate total revenue
    const totalRevenue = orders.reduce((acc, order) => acc + parseFloat(order.totalPrice), 0);

    // Calculate order frequency
    const orderFrequency = orders.length;

    // Calculate percentage of successful orders
    const successfulOrders = orders.filter((order) => order.status === 'DELIVERED').length;
    const successRate = successfulOrders / orderFrequency;

    // Define weights for each criterion
    const weights = {
      revenueWeight: 0.4,
      frequencyWeight: 0.4,
      successRateWeight: 0.2,
    };

    // Calculate credit score based on the above factors
    let creditScore = 0;

    // Revenue contributes to the credit score
    const revenueScore = (totalRevenue / 5000) * 100 * weights.revenueWeight; // Assuming 5000 is the maximum expected revenue
    creditScore += revenueScore;

    // Order frequency contributes to the credit score
    const frequencyScore = (orderFrequency / 10) * 100 * weights.frequencyWeight; // Assuming 10 is the maximum expected frequency
    creditScore += frequencyScore;

    // Success rate contributes to the credit score
    const successRateScore = successRate * 100 * weights.successRateWeight;
    creditScore += successRateScore;

    // Normalize credit score to a range of 1 to 100
    creditScore = Math.max(Math.min(creditScore, 100), 1);

    return creditScore;
  }
}
