import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Order } from '@prisma/postgres/client';

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
}
