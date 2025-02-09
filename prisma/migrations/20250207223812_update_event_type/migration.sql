-- AlterTable
ALTER TABLE `Event` MODIFY `eventType` ENUM('START', 'FINISH', 'GOAL', 'YELLOW_CARD', 'RED_CARD', 'SUBSTITUTION', 'OWN_GOAL', 'SHOTS', 'SHOTS_ON_TARGET', 'BIG_CHANCES_CREATED', 'KEY_PASSES', 'SUCCESSFUL_DRIBBLES', 'SAVE') NOT NULL;
