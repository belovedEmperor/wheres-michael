/*
  Warnings:

  - You are about to drop the `UserScores` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserScores" DROP CONSTRAINT "UserScores_imageId_fkey";

-- DropForeignKey
ALTER TABLE "UserScores" DROP CONSTRAINT "UserScores_userId_fkey";

-- DropTable
DROP TABLE "UserScores";

-- CreateTable
CREATE TABLE "UserTimes" (
    "id" SERIAL NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endTime" TIMESTAMP(3),
    "boxCornerOne" INTEGER NOT NULL,
    "boxCornerTwo" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "imageId" INTEGER NOT NULL,

    CONSTRAINT "UserTimes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserTimes" ADD CONSTRAINT "UserTimes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTimes" ADD CONSTRAINT "UserTimes_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;
