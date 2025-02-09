-- DropForeignKey
ALTER TABLE `Event` DROP FOREIGN KEY `Event_clubId_fkey`;

-- DropForeignKey
ALTER TABLE `Event` DROP FOREIGN KEY `Event_playerId_fkey`;

-- DropIndex
DROP INDEX `Event_clubId_fkey` ON `Event`;

-- DropIndex
DROP INDEX `Event_playerId_fkey` ON `Event`;

-- AlterTable
ALTER TABLE `Event` MODIFY `playerId` INTEGER NULL,
    MODIFY `clubId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Event` ADD CONSTRAINT `Event_playerId_fkey` FOREIGN KEY (`playerId`) REFERENCES `Player`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Event` ADD CONSTRAINT `Event_clubId_fkey` FOREIGN KEY (`clubId`) REFERENCES `Club`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
