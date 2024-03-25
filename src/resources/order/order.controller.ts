import { Body, Controller, Post, Get, UseGuards, Param, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Order } from '@prisma/client';

import { NewOrderDto } from './dto/new-order-dto';
import { OrderService } from './order.service';

import { AuthUser, UserContext } from '@/core/decorators/user.decorator';

@ApiTags('Order')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('save')
  saveNewOrder(@AuthUser() user: UserContext, @Body() payload: NewOrderDto): Promise<Partial<Order>> {
    return this.orderService.saveOrder(user.id, payload);
  }

  @Get(':id')
  getOrderById(@AuthUser() user: UserContext, @Param('id') id: string): Promise<Partial<Order>> {
    return this.orderService.getOrderById(id, user.id);
  }

  @Get('detailsForToday')
  getOrderDetailsForToday(
    @AuthUser() user: UserContext,
    @Query('offset') offset: number,
    @Query('limit') limit: number,
  ): Promise<Partial<Order>[]> {
    return this.orderService.getOrderDetailsForToday(user.id, offset, limit);
  }

  @Get('overallDetails')
  getOverallOrderDetails(
    @AuthUser() user: UserContext,
    @Query('offset') offset: number,
    @Query('limit') limit: number,
  ): Promise<Partial<Order>[]> {
    return this.orderService.getOverallOrderDetails(user.id, offset, limit);
  }

  @Get('totalForToday')
  getTotalNumberForToday(@AuthUser() user: UserContext): Promise<number> {
    return this.orderService.getTotalNumberForToday(user.id);
  }

  @Get('overallNumber')
  getOverallNumber(@AuthUser() user: UserContext): Promise<number> {
    return this.orderService.getOverallNumber(user.id);
  }

  @Get('creditScore')
  getCreditScore(@AuthUser() user: UserContext): Promise<number> {
    return this.orderService.calculateCreditScore(user.id);
  }
}
