/*
  Warnings:

  - A unique constraint covering the columns `[animationId]` on the table `Wish` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Wish` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Wish_animationId_key" ON "Wish"("animationId");

-- CreateIndex
CREATE UNIQUE INDEX "Wish_userId_key" ON "Wish"("userId");
