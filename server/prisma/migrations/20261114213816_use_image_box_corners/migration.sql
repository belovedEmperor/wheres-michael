/*
  Warnings:

  - You are about to drop the column `box_height` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `box_width` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `x` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `y` on the `Image` table. All the data in the column will be lost.
  - Added the required column `boxCornerOne` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `boxCornerTwo` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Image" DROP COLUMN "box_height",
DROP COLUMN "box_width",
DROP COLUMN "x",
DROP COLUMN "y",
ADD COLUMN     "boxCornerOne" INTEGER NOT NULL,
ADD COLUMN     "boxCornerTwo" INTEGER NOT NULL;
