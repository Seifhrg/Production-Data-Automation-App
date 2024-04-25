-- CreateTable
CREATE TABLE "HeaderWO" (
    "numOF" INTEGER NOT NULL,
    "costMethod" TEXT NOT NULL,

    CONSTRAINT "HeaderWO_pkey" PRIMARY KEY ("numOF")
);

-- CreateTable
CREATE TABLE "WorkOrder" (
    "DOCO" SERIAL NOT NULL,
    "quantityOrdered" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "requestedDate" TIMESTAMP(3) NOT NULL,
    "workOrderDate" TIMESTAMP(3) NOT NULL,
    "quantityShipped" INTEGER NOT NULL,
    "quantityCanceled" INTEGER NOT NULL,
    "unaccountedDirectLaborHours" INTEGER NOT NULL,
    "documentType" TEXT NOT NULL,
    "statusChangeDate" TIMESTAMP(3) NOT NULL,
    "statusCode" TEXT NOT NULL,
    "completionDate" TIMESTAMP(3) NOT NULL,
    "updatedDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkOrder_pkey" PRIMARY KEY ("DOCO")
);

-- CreateTable
CREATE TABLE "WorkOrderRouting" (
    "numOF" INTEGER NOT NULL,
    "sequenceNumberOperations" TEXT NOT NULL,
    "businessUnit" TEXT NOT NULL,
    "typeOperationCode" TEXT NOT NULL,
    "runLabour" INTEGER NOT NULL,
    "runMachine" INTEGER NOT NULL,
    "setupLabor" INTEGER NOT NULL,

    CONSTRAINT "WorkOrderRouting_pkey" PRIMARY KEY ("numOF","sequenceNumberOperations","businessUnit","typeOperationCode")
);

-- CreateTable
CREATE TABLE "WorkOrderPartsList" (
    "numOF" INTEGER NOT NULL,
    "LITM" TEXT NOT NULL,
    "UKID" SERIAL NOT NULL,
    "quantityOrdered" INTEGER NOT NULL,
    "issuedQuantity" INTEGER NOT NULL,
    "unaccountedDirectLaborHours" INTEGER NOT NULL,
    "unaccountedDirectLaborAmount" INTEGER NOT NULL,
    "updatedDate" TIMESTAMP(3) NOT NULL,
    "quantityCanceled" INTEGER NOT NULL,
    "documentType" TEXT NOT NULL,

    CONSTRAINT "WorkOrderPartsList_pkey" PRIMARY KEY ("LITM","UKID")
);

-- CreateTable
CREATE TABLE "HistoriqueMouvement" (
    "numOF" INTEGER NOT NULL,
    "UKID" SERIAL NOT NULL,
    "codeArticle" TEXT NOT NULL,
    "orderAndTransactionDate" TIMESTAMP(3) NOT NULL,
    "recordCreationDate" TIMESTAMP(3) NOT NULL,
    "postedCode" TEXT NOT NULL,
    "documentType" TEXT NOT NULL,

    CONSTRAINT "HistoriqueMouvement_pkey" PRIMARY KEY ("UKID")
);

-- CreateTable
CREATE TABLE "EmplacementArticle" (
    "codeArticle" TEXT NOT NULL,
    "lotStatusCode" TEXT NOT NULL,
    "quantityOnHand" INTEGER NOT NULL,
    "quantityReserved" INTEGER NOT NULL,
    "quantityAvailable" INTEGER NOT NULL,

    CONSTRAINT "EmplacementArticle_pkey" PRIMARY KEY ("codeArticle")
);

-- CreateIndex
CREATE UNIQUE INDEX "WorkOrderPartsList_numOF_key" ON "WorkOrderPartsList"("numOF");

-- CreateIndex
CREATE UNIQUE INDEX "WorkOrderPartsList_LITM_key" ON "WorkOrderPartsList"("LITM");

-- CreateIndex
CREATE UNIQUE INDEX "WorkOrderPartsList_numOF_LITM_key" ON "WorkOrderPartsList"("numOF", "LITM");

-- CreateIndex
CREATE UNIQUE INDEX "HistoriqueMouvement_codeArticle_key" ON "HistoriqueMouvement"("codeArticle");

-- CreateIndex
CREATE UNIQUE INDEX "HistoriqueMouvement_numOF_codeArticle_key" ON "HistoriqueMouvement"("numOF", "codeArticle");

-- CreateIndex
CREATE UNIQUE INDEX "EmplacementArticle_codeArticle_key" ON "EmplacementArticle"("codeArticle");

-- AddForeignKey
ALTER TABLE "HeaderWO" ADD CONSTRAINT "HeaderWO_numOF_fkey" FOREIGN KEY ("numOF") REFERENCES "WorkOrder"("DOCO") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkOrderRouting" ADD CONSTRAINT "WorkOrderRouting_numOF_fkey" FOREIGN KEY ("numOF") REFERENCES "WorkOrder"("DOCO") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkOrderPartsList" ADD CONSTRAINT "WorkOrderPartsList_numOF_fkey" FOREIGN KEY ("numOF") REFERENCES "WorkOrder"("DOCO") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoriqueMouvement" ADD CONSTRAINT "HistoriqueMouvement_numOF_codeArticle_fkey" FOREIGN KEY ("numOF", "codeArticle") REFERENCES "WorkOrderPartsList"("numOF", "LITM") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmplacementArticle" ADD CONSTRAINT "EmplacementArticle_codeArticle_fkey" FOREIGN KEY ("codeArticle") REFERENCES "HistoriqueMouvement"("codeArticle") ON DELETE RESTRICT ON UPDATE CASCADE;
