-- CreateTable
CREATE TABLE "Map" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,

    CONSTRAINT "Map_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Target" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "position" JSONB NOT NULL,
    "mapId" TEXT NOT NULL,

    CONSTRAINT "Target_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Scorer" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "time" INTEGER NOT NULL,
    "mapId" TEXT NOT NULL,

    CONSTRAINT "Scorer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Target" ADD CONSTRAINT "Target_mapId_fkey" FOREIGN KEY ("mapId") REFERENCES "Map"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Scorer" ADD CONSTRAINT "Scorer_mapId_fkey" FOREIGN KEY ("mapId") REFERENCES "Map"("id") ON DELETE CASCADE ON UPDATE CASCADE;
