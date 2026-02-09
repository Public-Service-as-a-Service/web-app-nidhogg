/*
  Warnings:

  - You are about to drop the column `createDate` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the `GroupMember` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `createdBy` to the `Group` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Group` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `GroupMember` DROP FOREIGN KEY `GroupMember_employeeId_fkey`;

-- DropForeignKey
ALTER TABLE `GroupMember` DROP FOREIGN KEY `GroupMember_groupId_fkey`;

-- AlterTable
ALTER TABLE `Group` DROP COLUMN `createDate`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `createdBy` VARCHAR(191) NOT NULL,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `GroupMember`;

-- CreateTable
CREATE TABLE `_GroupToEmployee` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_GroupToEmployee_AB_unique`(`A`, `B`),
    INDEX `_GroupToEmployee_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Group` ADD CONSTRAINT `Group_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_GroupToEmployee` ADD CONSTRAINT `_GroupToEmployee_A_fkey` FOREIGN KEY (`A`) REFERENCES `Employee`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_GroupToEmployee` ADD CONSTRAINT `_GroupToEmployee_B_fkey` FOREIGN KEY (`B`) REFERENCES `Group`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
