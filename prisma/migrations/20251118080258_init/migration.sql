-- CreateTable
CREATE TABLE "WifiPoint" (
    "id" TEXT NOT NULL,
    "program" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "district" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WifiPoint_pkey" PRIMARY KEY ("id")
);
