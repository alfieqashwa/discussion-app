/*
  Warnings:

  - You are about to drop the column `registrationPapersCopy` on the `Document` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Document" DROP COLUMN "registrationPapersCopy",
ADD COLUMN     "registrationPaper" TEXT;
