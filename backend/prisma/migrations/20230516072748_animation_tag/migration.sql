-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "animationId" INTEGER NOT NULL,
    "tagtypeId" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TagType" (
    "type" TEXT NOT NULL,

    CONSTRAINT "TagType_pkey" PRIMARY KEY ("type")
);

-- CreateIndex
CREATE UNIQUE INDEX "TagType_type_key" ON "TagType"("type");

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_animationId_fkey" FOREIGN KEY ("animationId") REFERENCES "Animation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_tagtypeId_fkey" FOREIGN KEY ("tagtypeId") REFERENCES "TagType"("type") ON DELETE RESTRICT ON UPDATE CASCADE;
