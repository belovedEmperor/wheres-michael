/*
  Warnings:

  - You are about to drop the column `length` on the `Image` table. All the data in the column will be lost.
  - Added the required column `box_height` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `box_width` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Image" DROP COLUMN "length",
ADD COLUMN     "box_height" INTEGER NOT NULL,
ADD COLUMN     "box_width" INTEGER NOT NULL;
