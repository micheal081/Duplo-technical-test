import { OrderStatusEnum } from '@prisma/client';

export interface OrderData {
  userId: string;
  businessName: string;
  customerName: string;
  productId?: string;
  productName: string;
  quantity: number;
  pricePerUnit: number;
  totalPrice: number;
  shippingAddress: string;
  status: OrderStatusEnum;
}
