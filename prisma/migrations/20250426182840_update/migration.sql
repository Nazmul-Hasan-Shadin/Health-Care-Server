/*
  Warnings:

  - The `pregnancyStatus` column on the `patient_health_data` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "bloodGroup" AS ENUM ('A_POSITIVE', 'B_POSITIVE');

-- AlterTable
ALTER TABLE "patient_health_data" ALTER COLUMN "hasAllergies" SET DEFAULT false,
ALTER COLUMN "hasDiabetes" SET DEFAULT false,
DROP COLUMN "pregnancyStatus",
ADD COLUMN     "pregnancyStatus" BOOLEAN DEFAULT false,
ALTER COLUMN "hasPastSurgeries" SET DEFAULT false,
ALTER COLUMN "recentAnxiety" SET DEFAULT false,
ALTER COLUMN "recentDepression" SET DEFAULT false;
