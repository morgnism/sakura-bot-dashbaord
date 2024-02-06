/*
  Warnings:

  - Added the required column `color` to the `role` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `role` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "role" ADD COLUMN     "color" INTEGER NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;
