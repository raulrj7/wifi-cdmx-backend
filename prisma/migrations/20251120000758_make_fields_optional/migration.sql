/*
  Warnings:

  - You are about to drop the `WifiPoint` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "WifiPoint";

-- CreateTable
CREATE TABLE "Wifi" (
    "id" SERIAL NOT NULL,
    "wifi_id" TEXT,
    "program" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "district" TEXT,

    CONSTRAINT "Wifi_pkey" PRIMARY KEY ("id")
);
