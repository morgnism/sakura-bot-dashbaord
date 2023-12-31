-- CreateEnum
CREATE TYPE "RoleAction" AS ENUM ('ADD', 'REMOVE');

-- CreateEnum
CREATE TYPE "RoleType" AS ENUM ('DEFAULT', 'MODERATOR', 'ADMINISTRATOR');

-- CreateTable
CREATE TABLE "discordusers" (
    "id" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "discordusers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "guildconfig" (
    "id" BIGINT NOT NULL,
    "prefix" TEXT NOT NULL DEFAULT '$',
    "active" BOOLEAN NOT NULL DEFAULT false,
    "systemChannelId" BIGINT,
    "afkChannelId" BIGINT,
    "rulesChannelId" BIGINT,
    "publicUpdatesChannelId" BIGINT,
    "safetyAlertsChannelId" BIGINT,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "guildconfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "welcomeconfig" (
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "channelId" BIGINT,
    "dmEnabled" BOOLEAN NOT NULL DEFAULT false,
    "message" TEXT,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "guildId" BIGINT NOT NULL
);

-- CreateTable
CREATE TABLE "leaveconfig" (
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "channelId" BIGINT,
    "dmEnabled" BOOLEAN NOT NULL DEFAULT false,
    "message" TEXT,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "guildId" BIGINT NOT NULL
);

-- CreateTable
CREATE TABLE "roleconfig" (
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "guildId" BIGINT NOT NULL
);

-- CreateTable
CREATE TABLE "ModerationConfig" (
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "dmPunish" BOOLEAN NOT NULL DEFAULT false,
    "includeReason" BOOLEAN NOT NULL DEFAULT false,
    "preserveBanMessages" BOOLEAN NOT NULL DEFAULT false,
    "deleteModCommands" BOOLEAN NOT NULL DEFAULT false,
    "logChannelId" BIGINT,
    "banMessage" TEXT NOT NULL DEFAULT '***{user} was banned***',
    "unbanMessage" TEXT NOT NULL DEFAULT '***{user} was unbanned***',
    "softbanMessage" TEXT NOT NULL DEFAULT '***{user} was soft banned***',
    "kickMessage" TEXT NOT NULL DEFAULT '***{user} was kicked***',
    "muteMessage" TEXT NOT NULL DEFAULT '***{user} was mute***',
    "unmuteMessage" TEXT NOT NULL DEFAULT '***{user} was unmuted***',
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "guildId" BIGINT NOT NULL
);

-- CreateTable
CREATE TABLE "roles" (
    "id" BIGINT NOT NULL,
    "guilId" BIGINT NOT NULL,
    "action" "RoleAction" NOT NULL DEFAULT 'ADD',
    "delay" BIGINT NOT NULL DEFAULT 0,
    "type" "RoleType" NOT NULL DEFAULT 'DEFAULT',
    "protected" BOOLEAN NOT NULL DEFAULT false,

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
CREATE UNIQUE INDEX "welcomeconfig_guildId_key" ON "welcomeconfig"("guildId");

-- CreateIndex
CREATE UNIQUE INDEX "leaveconfig_guildId_key" ON "leaveconfig"("guildId");

-- CreateIndex
CREATE UNIQUE INDEX "roleconfig_guildId_key" ON "roleconfig"("guildId");

-- CreateIndex
CREATE UNIQUE INDEX "ModerationConfig_guildId_key" ON "ModerationConfig"("guildId");

-- CreateIndex
CREATE UNIQUE INDEX "_DiscordUserToGuildConfig_AB_unique" ON "_DiscordUserToGuildConfig"("A", "B");

-- CreateIndex
CREATE INDEX "_DiscordUserToGuildConfig_B_index" ON "_DiscordUserToGuildConfig"("B");

-- AddForeignKey
ALTER TABLE "welcomeconfig" ADD CONSTRAINT "welcomeconfig_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "guildconfig"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leaveconfig" ADD CONSTRAINT "leaveconfig_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "guildconfig"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roleconfig" ADD CONSTRAINT "roleconfig_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "guildconfig"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModerationConfig" ADD CONSTRAINT "ModerationConfig_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "guildconfig"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DiscordUserToGuildConfig" ADD CONSTRAINT "_DiscordUserToGuildConfig_A_fkey" FOREIGN KEY ("A") REFERENCES "discordusers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DiscordUserToGuildConfig" ADD CONSTRAINT "_DiscordUserToGuildConfig_B_fkey" FOREIGN KEY ("B") REFERENCES "guildconfig"("id") ON DELETE CASCADE ON UPDATE CASCADE;
