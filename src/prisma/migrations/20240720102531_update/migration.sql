/*
  Warnings:

  - You are about to drop the column `purchaseId` on the `Payment` table. All the data in the column will be lost.
  - Added the required column `paymentId` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentId` to the `Purchase` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "purchaseId",
ADD COLUMN     "paymentId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Purchase" ADD COLUMN     "paymentId" TEXT NOT NULL;
