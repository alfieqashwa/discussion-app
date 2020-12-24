/*
  Warnings:

  - You are about to drop the column `address` on the `organizations` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "organizations" DROP COLUMN "address";

-- CreateTable
CREATE TABLE "Address" (
"id" SERIAL,
    "address" TEXT,
    "city" TEXT,
    "country" TEXT NOT NULL,
    "zip" TEXT,
    "organizationId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Address_organizationId_unique" ON "Address"("organizationId");

-- AddForeignKey
ALTER TABLE "Address" ADD FOREIGN KEY("organizationId")REFERENCES "organizations"("id") ON DELETE SET NULL ON UPDATE CASCADE;
