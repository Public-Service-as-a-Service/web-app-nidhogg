/*
  Warnings:

  - You are about to drop the column `telephone` on the `Employee` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[personId]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `firstName` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orgId` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - The required column `personId` was added to the `Employee` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE `Employee` DROP COLUMN `telephone`,
    ADD COLUMN `firstName` VARCHAR(191) NOT NULL,
    ADD COLUMN `lastName` VARCHAR(191) NOT NULL,
    ADD COLUMN `orgId` VARCHAR(191) NOT NULL,
    ADD COLUMN `personId` VARCHAR(191) NOT NULL,
    ADD COLUMN `workMobile` VARCHAR(191) NULL,
    ADD COLUMN `workPhone` VARCHAR(191) NULL,
    ADD COLUMN `workTitle` VARCHAR(191) NULL,
    MODIFY `email` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Employee_personId_key` ON `Employee`(`personId`);

-- CreateIndex
CREATE UNIQUE INDEX `Employee_email_key` ON `Employee`(`email`);
