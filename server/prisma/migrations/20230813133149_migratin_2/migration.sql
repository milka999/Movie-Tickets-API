/*
  Warnings:

  - You are about to alter the column `price` on the `ticket` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `ticket` MODIFY `price` DOUBLE NOT NULL;
