/*
  Warnings:

  - Made the column `iconUrl` on table `Item` required. This step will fail if there are existing NULL values in that column.
  - Made the column `reqDEX` on table `Item` required. This step will fail if there are existing NULL values in that column.
  - Made the column `reqINT` on table `Item` required. This step will fail if there are existing NULL values in that column.
  - Made the column `reqLUK` on table `Item` required. This step will fail if there are existing NULL values in that column.
  - Made the column `reqLevel` on table `Item` required. This step will fail if there are existing NULL values in that column.
  - Made the column `reqSTR` on table `Item` required. This step will fail if there are existing NULL values in that column.
  - Made the column `reqPOP` on table `Item` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Item" ALTER COLUMN "iconUrl" SET NOT NULL,
ALTER COLUMN "reqDEX" SET NOT NULL,
ALTER COLUMN "reqINT" SET NOT NULL,
ALTER COLUMN "reqLUK" SET NOT NULL,
ALTER COLUMN "reqLevel" SET NOT NULL,
ALTER COLUMN "reqSTR" SET NOT NULL,
ALTER COLUMN "reqPOP" SET NOT NULL;
