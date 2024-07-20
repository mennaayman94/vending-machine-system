/*
  Warnings:

  - You are about to drop the column `items` on the `Purchase` table. All the data in the column will be lost.
  - You are about to drop the column `totalSum` on the `Purchase` table. All the data in the column will be lost.
  - Added the required column `itemId` to the `Purchase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `Purchase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalCost` to the `Purchase` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Purchase" DROP COLUMN "items",
DROP COLUMN "totalSum",
ADD COLUMN     "itemId" TEXT NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL,
ADD COLUMN     "totalCost" DOUBLE PRECISION NOT NULL;

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "purchaseId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "totalSum" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);
