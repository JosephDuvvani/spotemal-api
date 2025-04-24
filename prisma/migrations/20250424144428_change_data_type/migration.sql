/*
  Warnings:

  - You are about to alter the column `time` on the `Scorer` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE "Scorer" ALTER COLUMN "time" SET DATA TYPE DECIMAL(10,2);
