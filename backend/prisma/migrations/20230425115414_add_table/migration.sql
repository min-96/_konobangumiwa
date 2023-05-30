-- CreateTable
CREATE TABLE "Animation" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "release" TIMESTAMP(3) NOT NULL,
    "introduction" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "grade" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Animation_pkey" PRIMARY KEY ("id")
);
