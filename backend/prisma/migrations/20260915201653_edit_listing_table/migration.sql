/*
  Warnings:

  - The values [SOLD] on the enum `ListingStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `sellerId` on the `Listing` table. All the data in the column will be lost.
  - You are about to drop the column `soldAt` on the `Listing` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Listing` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ListingType" AS ENUM ('BUY', 'SELL');

-- AlterEnum
BEGIN;
CREATE TYPE "ListingStatus_new" AS ENUM ('ACTIVE', 'FULFILLED', 'CANCELLED', 'EXPIRED');
ALTER TABLE "public"."Listing" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Listing" ALTER COLUMN "status" TYPE "ListingStatus_new" USING ("status"::text::"ListingStatus_new");
ALTER TYPE "ListingStatus" RENAME TO "ListingStatus_old";
ALTER TYPE "ListingStatus_new" RENAME TO "ListingStatus";
DROP TYPE "public"."ListingStatus_old";
ALTER TABLE "Listing" ALTER COLUMN "status" SET DEFAULT 'ACTIVE';
COMMIT;

-- DropForeignKey
ALTER TABLE "Listing" DROP CONSTRAINT "Listing_sellerId_fkey";

-- DropIndex
DROP INDEX "Listing_sellerId_idx";

-- AlterTable
ALTER TABLE "Listing" DROP COLUMN "sellerId",
DROP COLUMN "soldAt",
ADD COLUMN     "fulfilledAt" TIMESTAMP(3),
ADD COLUMN     "type" "ListingType" NOT NULL DEFAULT 'SELL',
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Listing_userId_idx" ON "Listing"("userId");

-- AddForeignKey
ALTER TABLE "Listing" ADD CONSTRAINT "Listing_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
