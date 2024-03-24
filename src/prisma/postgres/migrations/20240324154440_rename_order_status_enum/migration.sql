/*
  Warnings:

  - Changed the type of `status` on the `orders` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "OrderStatusEnum" AS ENUM ('PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED');

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "status",
ADD COLUMN     "status" "OrderStatusEnum" NOT NULL;

-- DropEnum
DROP TYPE "OrderStatus";
