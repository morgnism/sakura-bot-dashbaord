/*
  Warnings:

  - The `action` column on the `role` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `type` column on the `role` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "role" DROP COLUMN "action",
ADD COLUMN     "action" "RoleAction2" NOT NULL DEFAULT 'DEFAULT',
DROP COLUMN "type",
ADD COLUMN     "type" "RoleType2" NOT NULL DEFAULT 'DEFAULT';
