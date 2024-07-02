/*
  Warnings:

  - You are about to drop the column `totalTime` on the `Ticket` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "totalTime",
ALTER COLUMN "totalPrice" DROP NOT NULL;
