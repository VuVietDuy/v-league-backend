/*
  Warnings:

  - Added the required column `publishedAt` to the `News` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbnail` to the `News` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `News` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `News` ADD COLUMN `publishedAt` DATETIME(3) NOT NULL,
    ADD COLUMN `status` VARCHAR(191) NULL,
    ADD COLUMN `thumbnail` VARCHAR(191) NOT NULL,
    ADD COLUMN `title` VARCHAR(191) NOT NULL;
