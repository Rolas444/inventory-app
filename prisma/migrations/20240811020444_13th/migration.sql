-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_typeTransactionId_fkey";

-- CreateTable
CREATE TABLE "_TransactionToTypeTransaction" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TransactionToTypeTransaction_AB_unique" ON "_TransactionToTypeTransaction"("A", "B");

-- CreateIndex
CREATE INDEX "_TransactionToTypeTransaction_B_index" ON "_TransactionToTypeTransaction"("B");

-- AddForeignKey
ALTER TABLE "_TransactionToTypeTransaction" ADD CONSTRAINT "_TransactionToTypeTransaction_A_fkey" FOREIGN KEY ("A") REFERENCES "Transaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TransactionToTypeTransaction" ADD CONSTRAINT "_TransactionToTypeTransaction_B_fkey" FOREIGN KEY ("B") REFERENCES "TypeTransaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;
