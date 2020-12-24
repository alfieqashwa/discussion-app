-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "country" TEXT,
ALTER COLUMN "state" DROP NOT NULL;
