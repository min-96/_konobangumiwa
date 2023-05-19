/*
  Warnings:

  - You are about to alter the column `evaluation` on the `Review` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Animation" ALTER COLUMN "grade" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Review" ALTER COLUMN "evaluation" SET DATA TYPE INTEGER;
