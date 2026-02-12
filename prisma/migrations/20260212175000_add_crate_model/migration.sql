-- CreateTable
CREATE TABLE "Crate" (
    "id" SERIAL NOT NULL,
    "barcode" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "drinkId" INTEGER NOT NULL,
    "defaultPfandType" "PfandType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Crate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Crate_barcode_key" ON "Crate"("barcode");

-- CreateIndex
CREATE INDEX "Crate_barcode_idx" ON "Crate"("barcode");

-- CreateIndex
CREATE INDEX "Crate_drinkId_idx" ON "Crate"("drinkId");

-- AddForeignKey
ALTER TABLE "Crate" ADD CONSTRAINT "Crate_drinkId_fkey" FOREIGN KEY ("drinkId") REFERENCES "Drink"("id") ON DELETE CASCADE ON UPDATE CASCADE;
