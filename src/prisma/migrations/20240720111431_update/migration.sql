/*
  Warnings:

  - Added the required column `categoryId` to the `Purchase` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Purchase" ADD COLUMN     "categoryId" TEXT NOT NULL;
