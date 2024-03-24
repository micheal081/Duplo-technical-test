import { ApiProperty } from '@nestjs/swagger';

export enum OrderStatusEnum {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
}

export class NewOrderDto {
  @ApiProperty({ required: true })
  readonly customerName: string;

  @ApiProperty({ required: false })
  readonly productId?: string;

  @ApiProperty({ required: true })
  readonly productName: string;

  @ApiProperty({ required: true })
  readonly quantity: number;

  @ApiProperty({ required: true })
  readonly pricePerUnit: number;

  @ApiProperty({ required: true })
  readonly totalPrice: number;

  @ApiProperty({ required: false })
  readonly shippingAddress?: string;

  @ApiProperty({ required: true })
  readonly status: OrderStatusEnum;
}
