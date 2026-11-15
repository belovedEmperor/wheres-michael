/*
  Warnings:

  - You are about to drop the column `boxCornerOneX` on the `UserTimes` table. All the data in the column will be lost.
  - You are about to drop the column `boxCornerOneY` on the `UserTimes` table. All the data in the column will be lost.
  - You are about to drop the column `boxCornerTwoX` on the `UserTimes` table. All the data in the column will be lost.
  - You are about to drop the column `boxCornerTwoY` on the `UserTimes` table. All the data in the column will be lost.
  - Added the required column `guessX` to the `UserTimes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `guessY` to the `UserTimes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserTimes" DROP COLUMN "boxCornerOneX",
DROP COLUMN "boxCornerOneY",
DROP COLUMN "boxCornerTwoX",
DROP COLUMN "boxCornerTwoY",
ADD COLUMN     "guessX" INTEGER NOT NULL,
ADD COLUMN     "guessY" INTEGER NOT NULL;
