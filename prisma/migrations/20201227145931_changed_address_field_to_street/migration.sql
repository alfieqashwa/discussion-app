/*
  Warnings:

  - You are about to drop the column `address` on the `Address` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Address" DROP COLUMN "address",
ADD COLUMN     "street" TEXT;
