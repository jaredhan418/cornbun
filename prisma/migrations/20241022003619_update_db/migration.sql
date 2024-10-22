-- AlterTable
ALTER TABLE "vininfo" ADD COLUMN     "currentLat" TEXT,
ADD COLUMN     "currentLon" TEXT;

-- CreateTable
CREATE TABLE "voiceStorage" (
    "id" SERIAL NOT NULL,
    "voiceFile" BYTEA
);

-- CreateTable
CREATE TABLE "otk" (
    "id" SERIAL NOT NULL,
    "otkKey" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "vin" TEXT NOT NULL,
    "feature" TEXT,

    CONSTRAINT "otk_pkey" PRIMARY KEY ("id")
);
