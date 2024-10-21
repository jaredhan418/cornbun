/*
  Warnings:

  - You are about to drop the column `accountId` on the `vininfo` table. All the data in the column will be lost.
  - You are about to drop the column `displayname` on the `vininfo` table. All the data in the column will be lost.
  - You are about to drop the column `token` on the `vininfo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "vininfo" DROP COLUMN "accountId",
DROP COLUMN "displayname",
DROP COLUMN "token",
ADD COLUMN     "userId" VARCHAR(255);

-- CreateTable
CREATE TABLE "vinGroup" (
    "id" SERIAL NOT NULL,
    "vin" VARCHAR(17) NOT NULL,
    "token" VARCHAR(4096) NOT NULL,
    "userId" VARCHAR(255) NOT NULL,

    CONSTRAINT "vinGroup_pkey" PRIMARY KEY ("id")
);
