/*
  Warnings:

  - You are about to drop the column `boxCornerOne` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `boxCornerTwo` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `boxCornerOne` on the `UserTimes` table. All the data in the column will be lost.
  - You are about to drop the column `boxCornerTwo` on the `UserTimes` table. All the data in the column will be lost.
  - Added the required column `boxCornerOneX` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `boxCornerOneY` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `boxCornerTwoX` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `boxCornerTwoY` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `boxCornerOneX` to the `UserTimes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `boxCornerOneY` to the `UserTimes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `boxCornerTwoX` to the `UserTimes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `boxCornerTwoY` to the `UserTimes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Image" DROP COLUMN "boxCornerOne",
DROP COLUMN "boxCornerTwo",
ADD COLUMN     "boxCornerOneX" INTEGER NOT NULL,
ADD COLUMN     "boxCornerOneY" INTEGER NOT NULL,
ADD COLUMN     "boxCornerTwoX" INTEGER NOT NULL,
ADD COLUMN     "boxCornerTwoY" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "UserTimes" DROP COLUMN "boxCornerOne",
DROP COLUMN "boxCornerTwo",
ADD COLUMN     "boxCornerOneX" INTEGER NOT NULL,
ADD COLUMN     "boxCornerOneY" INTEGER NOT NULL,
ADD COLUMN     "boxCornerTwoX" INTEGER NOT NULL,
ADD COLUMN     "boxCornerTwoY" INTEGER NOT NULL;
