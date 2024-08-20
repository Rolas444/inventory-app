/*
  Warnings:

  - You are about to drop the `_ProductToTransaction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_TransactionToTypeTransaction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_TransactionToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ProductToTransaction" DROP CONSTRAINT "_ProductToTransaction_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductToTransaction" DROP CONSTRAINT "_ProductToTransaction_B_fkey";

-- DropForeignKey
ALTER TABLE "_TransactionToTypeTransaction" DROP CONSTRAINT "_TransactionToTypeTransaction_A_fkey";

-- DropForeignKey
ALTER TABLE "_TransactionToTypeTransaction" DROP CONSTRAINT "_TransactionToTypeTransaction_B_fkey";

-- DropForeignKey
ALTER TABLE "_TransactionToUser" DROP CONSTRAINT "_TransactionToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_TransactionToUser" DROP CONSTRAINT "_TransactionToUser_B_fkey";

-- DropTable
DROP TABLE "_ProductToTransaction";

-- DropTable
DROP TABLE "_TransactionToTypeTransaction";

-- DropTable
DROP TABLE "_TransactionToUser";

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_typeTransactionId_fkey" FOREIGN KEY ("typeTransactionId") REFERENCES "TypeTransaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
