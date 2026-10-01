/*
  Warnings:

  - You are about to drop the column `upgradeSlots` on the `Item` table. All the data in the column will be lost.
  - Made the column `expiresAt` on table `Listing` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
ALTER TYPE "ListingStatus" ADD VALUE 'EXPIRED';

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "upgradeSlots",
ADD COLUMN     "totalUpgradeCount" INTEGER;

-- AlterTable
ALTER TABLE "Listing" ALTER COLUMN "expiresAt" SET NOT NULL;
