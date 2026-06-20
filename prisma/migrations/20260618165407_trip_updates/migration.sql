-- AlterTable
ALTER TABLE "Trip" ADD COLUMN     "bookedSeats" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "duration" TEXT,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "journeyType" TEXT;
