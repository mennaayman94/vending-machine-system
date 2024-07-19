/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Catalog` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Catalog` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Catalog" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
