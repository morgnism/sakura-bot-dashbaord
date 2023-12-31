-- CreateEnum
CREATE TYPE "RoleAction" AS ENUM ('ADD', 'REMOVE');

-- CreateEnum
CREATE TYPE "RoleType" AS ENUM ('DEFAULT', 'MODERATOR', 'ADMINISTRATOR');

-- CreateTable
CREATE TABLE "discordusers" (
    "id" BIGINT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "discordusers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "guildconfig" (
    "id" BIGINT NOT NULL,
    "prefix" TEXT NOT NULL DEFAULT '$',
    "active" BOOLEAN NOT NULL DEFAULT false,
    "system_channel_id" BIGINT,
    "afk_channel_id" BIGINT,
    "rules_channel_id" BIGINT,
    "public_updates_channel_id" BIGINT,
    "safety_alerts_channel_id" BIGINT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "guildconfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "welcomeconfig" (
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "channel_id" BIGINT,
    "dm_enabled" BOOLEAN NOT NULL DEFAULT false,
    "message" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "guild_id" BIGINT NOT NULL
);

-- CreateTable
CREATE TABLE "leaveconfig" (
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "channelId" BIGINT,
    "dmEnabled" BOOLEAN NOT NULL DEFAULT false,
    "message" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "guild_id" BIGINT NOT NULL
);

-- CreateTable
CREATE TABLE "roleconfig" (
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "guild_id" BIGINT NOT NULL
);

-- CreateTable
CREATE TABLE "moderationconfig" (
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "dm_punish" BOOLEAN NOT NULL DEFAULT false,
    "include_reason" BOOLEAN NOT NULL DEFAULT false,
    "preserve_ban_messages" BOOLEAN NOT NULL DEFAULT false,
    "delete_mod_commands" BOOLEAN NOT NULL DEFAULT false,
    "log_channel_id" BIGINT,
    "banMessage" TEXT NOT NULL DEFAULT '***{user} was banned***',
    "unban_message" TEXT NOT NULL DEFAULT '***{user} was unbanned***',
    "softban_message" TEXT NOT NULL DEFAULT '***{user} was soft banned***',
    "kick_message" TEXT NOT NULL DEFAULT '***{user} was kicked***',
    "mute_message" TEXT NOT NULL DEFAULT '***{user} was mute***',
    "unmute_message" TEXT NOT NULL DEFAULT '***{user} was unmuted***',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "guild_id" BIGINT NOT NULL
);

-- CreateTable
CREATE TABLE "roles" (
    "id" BIGINT NOT NULL,
    "action" "RoleAction" NOT NULL DEFAULT 'ADD',
    "delay" BIGINT NOT NULL DEFAULT 0,
    "type" "RoleType" NOT NULL DEFAULT 'DEFAULT',
    "protected" BOOLEAN NOT NULL DEFAULT false,
    "role_config_id" BIGINT,
    "moderation_config_guild_id" BIGINT,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DiscordUserToGuildConfig" (
    "A" BIGINT NOT NULL,
    "B" BIGINT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "discordusers_id_key" ON "discordusers"("id");

-- CreateIndex
CREATE UNIQUE INDEX "guildconfig_id_key" ON "guildconfig"("id");

-- CreateIndex
CREATE UNIQUE INDEX "welcomeconfig_guild_id_key" ON "welcomeconfig"("guild_id");

-- CreateIndex
CREATE UNIQUE INDEX "leaveconfig_guild_id_key" ON "leaveconfig"("guild_id");

-- CreateIndex
CREATE UNIQUE INDEX "roleconfig_guild_id_key" ON "roleconfig"("guild_id");

-- CreateIndex
CREATE UNIQUE INDEX "moderationconfig_guild_id_key" ON "moderationconfig"("guild_id");

-- CreateIndex
CREATE UNIQUE INDEX "_DiscordUserToGuildConfig_AB_unique" ON "_DiscordUserToGuildConfig"("A", "B");

-- CreateIndex
CREATE INDEX "_DiscordUserToGuildConfig_B_index" ON "_DiscordUserToGuildConfig"("B");

-- AddForeignKey
ALTER TABLE "welcomeconfig" ADD CONSTRAINT "welcomeconfig_guild_id_fkey" FOREIGN KEY ("guild_id") REFERENCES "guildconfig"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leaveconfig" ADD CONSTRAINT "leaveconfig_guild_id_fkey" FOREIGN KEY ("guild_id") REFERENCES "guildconfig"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roleconfig" ADD CONSTRAINT "roleconfig_guild_id_fkey" FOREIGN KEY ("guild_id") REFERENCES "guildconfig"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "moderationconfig" ADD CONSTRAINT "moderationconfig_guild_id_fkey" FOREIGN KEY ("guild_id") REFERENCES "guildconfig"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roles" ADD CONSTRAINT "roles_role_config_id_fkey" FOREIGN KEY ("role_config_id") REFERENCES "roleconfig"("guild_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roles" ADD CONSTRAINT "roles_moderation_config_guild_id_fkey" FOREIGN KEY ("moderation_config_guild_id") REFERENCES "moderationconfig"("guild_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DiscordUserToGuildConfig" ADD CONSTRAINT "_DiscordUserToGuildConfig_A_fkey" FOREIGN KEY ("A") REFERENCES "discordusers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DiscordUserToGuildConfig" ADD CONSTRAINT "_DiscordUserToGuildConfig_B_fkey" FOREIGN KEY ("B") REFERENCES "guildconfig"("id") ON DELETE CASCADE ON UPDATE CASCADE;
