/*
  Warnings:

  - Added the required column `description` to the `WorkOrderPartsList` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TransationHistory" ADD COLUMN     "transactionExplanation" TEXT;

-- AlterTable
ALTER TABLE "WorkOrderPartsList" ADD COLUMN     "description" TEXT NOT NULL;
