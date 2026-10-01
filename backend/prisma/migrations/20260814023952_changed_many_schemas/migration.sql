/*
  Warnings:

  - You are about to drop the column `equipmentSlotId` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `requiredLevel` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `typeId` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the `EquipmentSlot` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ItemType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ListingModifier` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `category` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Job" AS ENUM ('WARRIOR', 'BOWMAN', 'MAGE', 'THIEF', 'PIRATE', 'ALL');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'UNISEX');

-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_equipmentSlotId_fkey";

-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_typeId_fkey";

-- DropForeignKey
ALTER TABLE "ListingModifier" DROP CONSTRAINT "ListingModifier_listingId_fkey";

-- DropForeignKey
ALTER TABLE "ListingModifier" DROP CONSTRAINT "ListingModifier_statId_fkey";

-- DropIndex
DROP INDEX "Item_equipmentSlotId_idx";

-- DropIndex
DROP INDEX "Item_name_key";

-- DropIndex
DROP INDEX "Item_typeId_idx";

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "equipmentSlotId",
DROP COLUMN "requiredLevel",
DROP COLUMN "typeId",
ADD COLUMN     "attackSpeed" INTEGER,
ADD COLUMN     "attackSpeedLabel" TEXT,
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "gender" "Gender",
ADD COLUMN     "knockback" INTEGER,
ADD COLUMN     "reqDEX" INTEGER,
ADD COLUMN     "reqINT" INTEGER,
ADD COLUMN     "reqJobLabel" TEXT,
ADD COLUMN     "reqJobs" "Job"[],
ADD COLUMN     "reqLUK" INTEGER,
ADD COLUMN     "reqLevel" INTEGER,
ADD COLUMN     "reqSTR" INTEGER,
ADD COLUMN     "subCategory" TEXT,
ADD COLUMN     "upgradeSlots" INTEGER,
ADD COLUMN     "weaponType" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "iconUrl" DROP NOT NULL;
DROP SEQUENCE "Item_id_seq";

-- AlterTable
ALTER TABLE "Listing" ADD COLUMN     "remainingUpgradeSlots" INTEGER;

-- DropTable
DROP TABLE "EquipmentSlot";

-- DropTable
DROP TABLE "ItemType";

-- DropTable
DROP TABLE "ListingModifier";

-- CreateTable
CREATE TABLE "ItemBaseStat" (
    "id" SERIAL NOT NULL,
    "itemId" INTEGER NOT NULL,
    "statId" INTEGER NOT NULL,
    "value" INTEGER NOT NULL,

    CONSTRAINT "ItemBaseStat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ListingStat" (
    "id" SERIAL NOT NULL,
    "listingId" INTEGER NOT NULL,
    "statId" INTEGER NOT NULL,
    "value" INTEGER NOT NULL,

    CONSTRAINT "ListingStat_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ItemBaseStat_itemId_idx" ON "ItemBaseStat"("itemId");

-- CreateIndex
CREATE INDEX "ItemBaseStat_statId_idx" ON "ItemBaseStat"("statId");

-- CreateIndex
CREATE UNIQUE INDEX "ItemBaseStat_itemId_statId_key" ON "ItemBaseStat"("itemId", "statId");

-- CreateIndex
CREATE INDEX "ListingStat_statId_value_idx" ON "ListingStat"("statId", "value");

-- CreateIndex
CREATE UNIQUE INDEX "ListingStat_listingId_statId_key" ON "ListingStat"("listingId", "statId");

-- CreateIndex
CREATE INDEX "Item_category_idx" ON "Item"("category");

-- CreateIndex
CREATE INDEX "Item_subCategory_idx" ON "Item"("subCategory");

-- CreateIndex
CREATE INDEX "Item_weaponType_idx" ON "Item"("weaponType");

-- CreateIndex
CREATE INDEX "Item_reqLevel_idx" ON "Item"("reqLevel");

-- AddForeignKey
ALTER TABLE "ItemBaseStat" ADD CONSTRAINT "ItemBaseStat_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemBaseStat" ADD CONSTRAINT "ItemBaseStat_statId_fkey" FOREIGN KEY ("statId") REFERENCES "Stat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListingStat" ADD CONSTRAINT "ListingStat_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListingStat" ADD CONSTRAINT "ListingStat_statId_fkey" FOREIGN KEY ("statId") REFERENCES "Stat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
