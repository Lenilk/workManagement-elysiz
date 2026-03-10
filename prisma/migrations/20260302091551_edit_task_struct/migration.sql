/*
  Warnings:

  - You are about to drop the column `userId` on the `task` table. All the data in the column will be lost.
  - Added the required column `workerId` to the `task` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "task" DROP CONSTRAINT "task_userId_fkey";

-- DropIndex
DROP INDEX "task_userId_idx";

-- AlterTable
ALTER TABLE "task" DROP COLUMN "userId",
ADD COLUMN     "workerId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "task_id_idx" ON "task"("id");

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
