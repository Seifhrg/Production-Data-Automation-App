/*
  Warnings:

  - Added the required column `quantityAvailable` to the `TransationHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TransationHistory" ADD COLUMN     "quantityAvailable" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "WorkOrder" ALTER COLUMN "description" DROP DEFAULT;
