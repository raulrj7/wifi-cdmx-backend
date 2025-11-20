/*
  Warnings:

  - You are about to drop the `Wifi` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Wifi";

-- CreateTable
CREATE TABLE "WifiPoint" (
    "id" SERIAL NOT NULL,
    "wifi_id" TEXT,
    "program" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "district" TEXT,

    CONSTRAINT "WifiPoint_pkey" PRIMARY KEY ("id")
);
