/*
  Warnings:

  - Made the column `transactionExplanation` on table `TransationHistory` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "TransationHistory_UKID_key";

-- AlterTable
ALTER TABLE "TransationHistory" ALTER COLUMN "transactionExplanation" SET NOT NULL;
