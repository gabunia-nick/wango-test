/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `City` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `City` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "City" ADD COLUMN     "code" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "City_code_key" ON "City"("code");
