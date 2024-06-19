/*
  Warnings:

  - The primary key for the `ItemLocation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `codeArticle` column on the `ItemLocation` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `TransationHistory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `WorkOrderPartsList` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `LITM` on the `WorkOrderPartsList` table. All the data in the column will be lost.
  - The primary key for the `WorkOrderRouting` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `typeOperationCode` on the `WorkOrderRouting` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[UKID]` on the table `TransationHistory` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `codeArticle` on the `TransationHistory` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `codeArticle` to the `WorkOrderPartsList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Description` to the `WorkOrderRouting` table without a default value. This is not possible if the table is not empty.
  - Added the required column `KITL` to the `WorkOrderRouting` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `sequenceNumberOperations` on the `WorkOrderRouting` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "ItemLocation" DROP CONSTRAINT "ItemLocation_codeArticle_fkey";

-- DropForeignKey
ALTER TABLE "TransationHistory" DROP CONSTRAINT "TransationHistory_codeArticle_fkey";

-- DropIndex
DROP INDEX "ItemLocation_codeArticle_key";

-- DropIndex
DROP INDEX "TransationHistory_codeArticle_key";

-- DropIndex
DROP INDEX "WorkOrderPartsList_LITM_key";

-- AlterTable
ALTER TABLE "ItemLocation" DROP CONSTRAINT "ItemLocation_pkey",
DROP COLUMN "codeArticle",
ADD COLUMN     "codeArticle" SERIAL NOT NULL,
ADD CONSTRAINT "ItemLocation_pkey" PRIMARY KEY ("codeArticle");

-- AlterTable
ALTER TABLE "TransationHistory" DROP CONSTRAINT "TransationHistory_pkey",
ADD COLUMN     "LITM" SERIAL NOT NULL,
ALTER COLUMN "UKID" DROP NOT NULL,
ALTER COLUMN "UKID" DROP DEFAULT,
DROP COLUMN "codeArticle",
ADD COLUMN     "codeArticle" INTEGER NOT NULL,
ADD CONSTRAINT "TransationHistory_pkey" PRIMARY KEY ("LITM");
DROP SEQUENCE "TransationHistory_UKID_seq";

-- AlterTable
ALTER TABLE "WorkOrder" ADD COLUMN     "description" TEXT NOT NULL DEFAULT 'Production février 2024',
ALTER COLUMN "documentType" SET DEFAULT 'WO';

-- AlterTable
ALTER TABLE "WorkOrderPartsList" DROP CONSTRAINT "WorkOrderPartsList_pkey",
DROP COLUMN "LITM",
ADD COLUMN     "codeArticle" INTEGER NOT NULL,
ADD CONSTRAINT "WorkOrderPartsList_pkey" PRIMARY KEY ("UKID");

-- AlterTable
ALTER TABLE "WorkOrderRouting" DROP CONSTRAINT "WorkOrderRouting_pkey",
DROP COLUMN "typeOperationCode",
ADD COLUMN     "Description" TEXT NOT NULL,
ADD COLUMN     "KITL" TEXT NOT NULL,
DROP COLUMN "sequenceNumberOperations",
ADD COLUMN     "sequenceNumberOperations" INTEGER NOT NULL,
ADD CONSTRAINT "WorkOrderRouting_pkey" PRIMARY KEY ("numOF", "sequenceNumberOperations");

-- CreateTable
CREATE TABLE "GammeStandard" (
    "KITL" TEXT NOT NULL,
    "operations" JSONB NOT NULL,

    CONSTRAINT "GammeStandard_pkey" PRIMARY KEY ("KITL")
);

-- CreateIndex
CREATE UNIQUE INDEX "TransationHistory_UKID_key" ON "TransationHistory"("UKID");

-- AddForeignKey
ALTER TABLE "WorkOrderPartsList" ADD CONSTRAINT "WorkOrderPartsList_codeArticle_fkey" FOREIGN KEY ("codeArticle") REFERENCES "ItemLocation"("codeArticle") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransationHistory" ADD CONSTRAINT "TransationHistory_UKID_fkey" FOREIGN KEY ("UKID") REFERENCES "WorkOrderPartsList"("UKID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransationHistory" ADD CONSTRAINT "TransationHistory_codeArticle_fkey" FOREIGN KEY ("codeArticle") REFERENCES "ItemLocation"("codeArticle") ON DELETE RESTRICT ON UPDATE CASCADE;
