-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "description" TEXT,
ADD COLUMN     "storeSellPrice" INTEGER;

-- AlterTable
ALTER TABLE "Listing" ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 1;
