-- AlterTable
ALTER TABLE "HistoriqueMouvement" ALTER COLUMN "recordCreationDate" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "WorkOrder" ALTER COLUMN "quantityShipped" SET DEFAULT 0,
ALTER COLUMN "quantityCanceled" SET DEFAULT 0,
ALTER COLUMN "unaccountedDirectLaborHours" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "WorkOrderPartsList" ALTER COLUMN "quantityCanceled" SET DEFAULT 0;
