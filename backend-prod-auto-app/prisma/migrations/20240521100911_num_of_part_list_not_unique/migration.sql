-- DropForeignKey
ALTER TABLE "TransationHistory" DROP CONSTRAINT "TransationHistory_numOF_codeArticle_fkey";

-- DropIndex
DROP INDEX "TransationHistory_numOF_codeArticle_key";

-- DropIndex
DROP INDEX "WorkOrderPartsList_numOF_LITM_key";

-- DropIndex
DROP INDEX "WorkOrderPartsList_numOF_key";

-- AddForeignKey
ALTER TABLE "TransationHistory" ADD CONSTRAINT "TransationHistory_codeArticle_fkey" FOREIGN KEY ("codeArticle") REFERENCES "WorkOrderPartsList"("LITM") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransationHistory" ADD CONSTRAINT "TransationHistory_numOF_fkey" FOREIGN KEY ("numOF") REFERENCES "WorkOrder"("DOCO") ON DELETE RESTRICT ON UPDATE CASCADE;
