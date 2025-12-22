/*
  Warnings:

  - The primary key for the `Employee` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Employee` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `Group` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Group` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `GroupMember` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `GroupMember` table. All the data in the column will be lost.
  - You are about to alter the column `groupId` on the `GroupMember` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `employeeId` on the `GroupMember` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `GroupMember` DROP FOREIGN KEY `GroupMember_employeeId_fkey`;

-- DropForeignKey
ALTER TABLE `GroupMember` DROP FOREIGN KEY `GroupMember_groupId_fkey`;

-- DropIndex
DROP INDEX `GroupMember_employeeId_fkey` ON `GroupMember`;

-- DropIndex
DROP INDEX `GroupMember_groupId_employeeId_key` ON `GroupMember`;

-- AlterTable
ALTER TABLE `Employee` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Group` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `GroupMember` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    MODIFY `groupId` INTEGER NOT NULL,
    MODIFY `employeeId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`groupId`, `employeeId`);

-- AddForeignKey
ALTER TABLE `GroupMember` ADD CONSTRAINT `GroupMember_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `Group`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GroupMember` ADD CONSTRAINT `GroupMember_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
