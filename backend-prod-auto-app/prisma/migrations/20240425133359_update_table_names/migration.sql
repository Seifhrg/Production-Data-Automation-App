/*
  Warnings:

  - You are about to drop the `EmplacementArticle` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `HistoriqueMouvement` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "EmplacementArticle" DROP CONSTRAINT "EmplacementArticle_codeArticle_fkey";

-- DropForeignKey
ALTER TABLE "HistoriqueMouvement" DROP CONSTRAINT "HistoriqueMouvement_numOF_codeArticle_fkey";

-- DropTable
DROP TABLE "EmplacementArticle";

-- DropTable
DROP TABLE "HistoriqueMouvement";

-- CreateTable
CREATE TABLE "TransationHistory" (
    "numOF" INTEGER NOT NULL,
    "UKID" SERIAL NOT NULL,
    "codeArticle" TEXT NOT NULL,
    "orderAndTransactionDate" TIMESTAMP(3) NOT NULL,
    "recordCreationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "postedCode" TEXT NOT NULL,
    "documentType" TEXT NOT NULL,

    CONSTRAINT "TransationHistory_pkey" PRIMARY KEY ("UKID")
);

-- CreateTable
CREATE TABLE "ItemLocation" (
    "codeArticle" TEXT NOT NULL,
    "lotStatusCode" TEXT NOT NULL,
    "quantityOnHand" INTEGER NOT NULL,
    "quantityReserved" INTEGER NOT NULL,
    "quantityAvailable" INTEGER NOT NULL,

    CONSTRAINT "ItemLocation_pkey" PRIMARY KEY ("codeArticle")
);

-- CreateIndex
CREATE UNIQUE INDEX "TransationHistory_codeArticle_key" ON "TransationHistory"("codeArticle");

-- CreateIndex
CREATE UNIQUE INDEX "TransationHistory_numOF_codeArticle_key" ON "TransationHistory"("numOF", "codeArticle");

-- CreateIndex
CREATE UNIQUE INDEX "ItemLocation_codeArticle_key" ON "ItemLocation"("codeArticle");

-- AddForeignKey
ALTER TABLE "TransationHistory" ADD CONSTRAINT "TransationHistory_numOF_codeArticle_fkey" FOREIGN KEY ("numOF", "codeArticle") REFERENCES "WorkOrderPartsList"("numOF", "LITM") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemLocation" ADD CONSTRAINT "ItemLocation_codeArticle_fkey" FOREIGN KEY ("codeArticle") REFERENCES "TransationHistory"("codeArticle") ON DELETE RESTRICT ON UPDATE CASCADE;
