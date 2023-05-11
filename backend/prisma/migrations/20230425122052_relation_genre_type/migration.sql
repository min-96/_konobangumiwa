/*
  Warnings:

  - Added the required column `genretypeId` to the `Genre` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Genre" ADD COLUMN     "genretypeId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "GenreType" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "GenreType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Genre" ADD CONSTRAINT "Genre_genretypeId_fkey" FOREIGN KEY ("genretypeId") REFERENCES "GenreType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
