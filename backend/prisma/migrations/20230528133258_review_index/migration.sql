-- CreateIndex
CREATE INDEX "Review_userId_evaluation_idx" ON "Review"("userId", "evaluation");

-- CreateIndex
CREATE INDEX "Review_animationId_idx" ON "Review"("animationId");
