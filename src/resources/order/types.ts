import { OrderStatusEnum } from '@prisma/postgres/client';

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

export interface Transaction {
  id: string;
  businessName: string;
  customerName: string;
  productId?: string;
  productName: string;
  quantity: number;
  pricePerUnit: number;
  totalPrice: number;
  shippingAddress?: string;
  status: OrderStatusEnum;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}
