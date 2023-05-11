-- AlterTable
ALTER TABLE "Animation" ALTER COLUMN "grade" SET DEFAULT 0,
ALTER COLUMN "grade" SET DATA TYPE DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "evaluation" DOUBLE PRECISION NOT NULL,
    "comment" TEXT NOT NULL,
    "animationId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_animationId_fkey" FOREIGN KEY ("animationId") REFERENCES "Animation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
