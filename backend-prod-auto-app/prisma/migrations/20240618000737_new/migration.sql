/*
  Warnings:

  - A unique constraint covering the columns `[codeArticle,numOF]` on the table `WorkOrderPartsList` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "WorkOrderPartsList_codeArticle_numOF_key" ON "WorkOrderPartsList"("codeArticle", "numOF");
