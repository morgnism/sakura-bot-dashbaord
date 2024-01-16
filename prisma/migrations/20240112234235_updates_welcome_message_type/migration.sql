/*
  Warnings:

  - You are about to alter the column `delay` on the `role` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The `message` column on the `welcomeconfig` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "role" ALTER COLUMN "delay" DROP DEFAULT,
ALTER COLUMN "delay" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "welcomeconfig" DROP COLUMN "message",
ADD COLUMN     "message" JSONB;
