-- AlterTable
ALTER TABLE "User" ADD COLUMN     "phone" TEXT,
ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true;
