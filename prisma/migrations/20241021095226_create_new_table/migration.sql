/*
  Warnings:

  - You are about to drop the column `token` on the `vinGroup` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `vinGroup` table. All the data in the column will be lost.
  - You are about to drop the column `vin` on the `vinGroup` table. All the data in the column will be lost.
  - Added the required column `groupCode` to the `vinGroup` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerId` to the `vinGroup` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "vinGroup" DROP COLUMN "token",
DROP COLUMN "userId",
DROP COLUMN "vin",
ADD COLUMN     "groupCode" TEXT NOT NULL,
ADD COLUMN     "groupName" TEXT,
ADD COLUMN     "ownerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "vininfo" ADD COLUMN     "groupCode" TEXT;
