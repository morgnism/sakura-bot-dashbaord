/*
  Warnings:

  - You are about to drop the `roles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "roles" DROP CONSTRAINT "roles_moderation_config_guild_id_fkey";

-- DropForeignKey
ALTER TABLE "roles" DROP CONSTRAINT "roles_role_config_id_fkey";

-- DropTable
DROP TABLE "roles";

-- CreateTable
CREATE TABLE "role" (
    "id" BIGINT NOT NULL,
    "action" "RoleAction" NOT NULL DEFAULT 'ADD',
    "delay" BIGINT NOT NULL DEFAULT 0,
    "type" "RoleType" NOT NULL DEFAULT 'DEFAULT',
    "protected" BOOLEAN NOT NULL DEFAULT false,
    "role_config_id" BIGINT,
    "moderation_config_guild_id" BIGINT,

    CONSTRAINT "role_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "role" ADD CONSTRAINT "role_role_config_id_fkey" FOREIGN KEY ("role_config_id") REFERENCES "roleconfig"("guild_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role" ADD CONSTRAINT "role_moderation_config_guild_id_fkey" FOREIGN KEY ("moderation_config_guild_id") REFERENCES "moderationconfig"("guild_id") ON DELETE SET NULL ON UPDATE CASCADE;
