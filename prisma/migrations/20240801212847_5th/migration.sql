/*
  Warnings:

  - You are about to drop the column `Status` on the `TypeTransaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TypeTransaction" DROP COLUMN "Status",
ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true;
