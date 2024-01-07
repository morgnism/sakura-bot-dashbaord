/*
  Warnings:

  - You are about to drop the column `afk_channel_id` on the `guildconfig` table. All the data in the column will be lost.
  - You are about to drop the column `public_updates_channel_id` on the `guildconfig` table. All the data in the column will be lost.
  - You are about to drop the column `rules_channel_id` on the `guildconfig` table. All the data in the column will be lost.
  - You are about to drop the column `safety_alerts_channel_id` on the `guildconfig` table. All the data in the column will be lost.
  - You are about to drop the column `system_channel_id` on the `guildconfig` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "guildconfig" DROP COLUMN "afk_channel_id",
DROP COLUMN "public_updates_channel_id",
DROP COLUMN "rules_channel_id",
DROP COLUMN "safety_alerts_channel_id",
DROP COLUMN "system_channel_id";

-- CreateTable
CREATE TABLE "Channels" (
    "id" BIGINT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "type" INTEGER NOT NULL,
    "is_updates_channel" BOOLEAN NOT NULL DEFAULT false,
    "guild_id" BIGINT NOT NULL,

    CONSTRAINT "Channels_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Channels_guild_id_key" ON "Channels"("guild_id");

-- AddForeignKey
ALTER TABLE "Channels" ADD CONSTRAINT "Channels_guild_id_fkey" FOREIGN KEY ("guild_id") REFERENCES "guildconfig"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
