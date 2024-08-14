/*
  Warnings:

  - You are about to drop the column `initStok` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "initStok",
ADD COLUMN     "initStock" INTEGER NOT NULL DEFAULT 0;
