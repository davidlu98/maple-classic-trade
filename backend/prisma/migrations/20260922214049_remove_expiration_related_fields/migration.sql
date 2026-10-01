/*
  Warnings:

  - The values [EXPIRED] on the enum `ListingStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `cancelledAt` on the `Listing` table. All the data in the column will be lost.
  - You are about to drop the column `expiresAt` on the `Listing` table. All the data in the column will be lost.
  - You are about to drop the column `fulfilledAt` on the `Listing` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ListingStatus_new" AS ENUM ('ACTIVE', 'FULFILLED');
ALTER TABLE "public"."Listing" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Listing" ALTER COLUMN "status" TYPE "ListingStatus_new" USING ("status"::text::"ListingStatus_new");
ALTER TYPE "ListingStatus" RENAME TO "ListingStatus_old";
ALTER TYPE "ListingStatus_new" RENAME TO "ListingStatus";
DROP TYPE "public"."ListingStatus_old";
ALTER TABLE "Listing" ALTER COLUMN "status" SET DEFAULT 'ACTIVE';
COMMIT;

-- AlterTable
ALTER TABLE "Listing" DROP COLUMN "cancelledAt",
DROP COLUMN "expiresAt",
DROP COLUMN "fulfilledAt";
