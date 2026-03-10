-- AlterTable
ALTER TABLE "user" ADD COLUMN     "approve" BOOLEAN DEFAULT false,
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'worker';

-- CreateIndex
CREATE INDEX "account_userId_idx" ON "account"("userId");

-- CreateIndex
CREATE INDEX "session_userId_idx" ON "session"("userId");

-- CreateIndex
CREATE INDEX "verification_identifier_idx" ON "verification"("identifier");
