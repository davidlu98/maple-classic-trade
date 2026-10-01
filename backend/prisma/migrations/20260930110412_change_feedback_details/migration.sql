/*
  Warnings:

  - You are about to drop the column `feedback` on the `Feedback` table. All the data in the column will be lost.
  - Added the required column `details` to the `Feedback` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Feedback" DROP COLUMN "feedback",
ADD COLUMN     "details" VARCHAR(250) NOT NULL;
