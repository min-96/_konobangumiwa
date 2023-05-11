/*
  Warnings:

  - A unique constraint covering the columns `[type]` on the table `GenreType` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "GenreType_type_key" ON "GenreType"("type");
