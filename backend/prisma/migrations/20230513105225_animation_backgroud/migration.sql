/*
  Warnings:

  - Added the required column `backgroundImg` to the `Animation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Animation" ADD COLUMN     "backgroundImg" TEXT NOT NULL;
