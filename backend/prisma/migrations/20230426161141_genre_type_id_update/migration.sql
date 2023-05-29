/*
  Warnings:

  - The primary key for the `GenreType` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `GenreType` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Genre" DROP CONSTRAINT "Genre_genretypeId_fkey";

-- AlterTable
ALTER TABLE "Genre" ALTER COLUMN "genretypeId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "GenreType" DROP CONSTRAINT "GenreType_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "GenreType_pkey" PRIMARY KEY ("type");

-- AddForeignKey
ALTER TABLE "Genre" ADD CONSTRAINT "Genre_genretypeId_fkey" FOREIGN KEY ("genretypeId") REFERENCES "GenreType"("type") ON DELETE RESTRICT ON UPDATE CASCADE;
