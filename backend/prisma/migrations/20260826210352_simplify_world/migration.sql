/*
  Warnings:

  - The values [UNISEX] on the enum `Gender` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `displayName` on the `World` table. All the data in the column will be lost.
  - You are about to drop the column `key` on the `World` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `World` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `World` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Gender_new" AS ENUM ('MALE', 'FEMALE');
ALTER TABLE "Item" ALTER COLUMN "gender" TYPE "Gender_new" USING ("gender"::text::"Gender_new");
ALTER TYPE "Gender" RENAME TO "Gender_old";
ALTER TYPE "Gender_new" RENAME TO "Gender";
DROP TYPE "public"."Gender_old";
COMMIT;

-- DropIndex
DROP INDEX "World_key_key";

-- AlterTable
ALTER TABLE "World" DROP COLUMN "displayName",
DROP COLUMN "key",
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Item_gender_idx" ON "Item"("gender");

-- CreateIndex
CREATE UNIQUE INDEX "World_name_key" ON "World"("name");
