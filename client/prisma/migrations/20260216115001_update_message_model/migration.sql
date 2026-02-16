/*
  Warnings:

  - You are about to drop the column `createDate` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Message` table. All the data in the column will be lost.
  - Added the required column `sender` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Message` DROP FOREIGN KEY `Message_userId_fkey`;

-- DropIndex
DROP INDEX `Message_userId_fkey` ON `Message`;

-- AlterTable
ALTER TABLE `Message` DROP COLUMN `createDate`,
    DROP COLUMN `userId`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `sender` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `MessageRecipient` (
    `messageId` VARCHAR(191) NOT NULL,
    `employeeId` INTEGER NOT NULL,
    `orgId` VARCHAR(191) NOT NULL,
    `workTitle` VARCHAR(191) NOT NULL,
    `deliveryStatus` VARCHAR(191) NOT NULL,
    `receivedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`messageId`, `employeeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MessageRecipient` ADD CONSTRAINT `MessageRecipient_messageId_fkey` FOREIGN KEY (`messageId`) REFERENCES `Message`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MessageRecipient` ADD CONSTRAINT `MessageRecipient_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
