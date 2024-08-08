-- AlterTable
ALTER TABLE "PlatformProduct" ADD COLUMN     "initQuantity" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "initStok" INTEGER NOT NULL DEFAULT 0;
