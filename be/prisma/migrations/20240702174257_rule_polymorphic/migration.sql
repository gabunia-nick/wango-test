/*
  Warnings:

  - You are about to drop the column `areaId` on the `Rule` table. All the data in the column will be lost.
  - Added the required column `entityId` to the `Rule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `entityType` to the `Rule` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RuleEntityType" AS ENUM ('CITY', 'AREA');

-- DropForeignKey
ALTER TABLE "Rule" DROP CONSTRAINT "Rule_areaId_fkey";

-- AlterTable
ALTER TABLE "Rule" DROP COLUMN "areaId",
ADD COLUMN     "entityId" INTEGER NOT NULL,
ADD COLUMN     "entityType" "RuleEntityType" NOT NULL;
