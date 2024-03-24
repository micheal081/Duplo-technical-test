/*
  Warnings:

  - Added the required column `business_name` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customer_name` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "business_name" TEXT NOT NULL,
ADD COLUMN     "customer_name" TEXT NOT NULL;
