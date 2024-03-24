import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

enum OrderStatusEnum {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
}

@Schema({
  timestamps: true,
})
export class Transaction {
  @Prop()
  userId: string;

  @Prop()
  businessName: string;

  @Prop()
  customerName: string;

  @Prop()
  productId: string;

  @Prop()
  productName: string;

  @Prop()
  quantity: string;

  @Prop()
  pricePerUnit: string;

  @Prop()
  totalPrice: string;

  @Prop()
  shippingAddress: string;

  @Prop()
  status: OrderStatusEnum;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
