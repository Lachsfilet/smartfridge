-- AlterTable
ALTER TABLE "Drink" DROP COLUMN "isOpened",
ADD COLUMN "openedQuantity" INTEGER NOT NULL DEFAULT 0;

-- DropIndex
DROP INDEX "Drink_isOpened_idx";

-- CreateIndex
CREATE INDEX "Drink_openedQuantity_idx" ON "Drink"("openedQuantity");
