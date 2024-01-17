/*
  Warnings:

  - You are about to drop the `Reply` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Reply` DROP FOREIGN KEY `Reply_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Reply` DROP FOREIGN KEY `Reply_ibfk_2`;

-- AlterTable
ALTER TABLE `Comment` ADD COLUMN `parent_id` INTEGER NULL;

-- DropTable
DROP TABLE `Reply`;

-- CreateIndex
CREATE INDEX `parent_id` ON `Comment`(`parent_id`);

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_parent_id_fkey` FOREIGN KEY (`parent_id`) REFERENCES `Comment`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
