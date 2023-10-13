/*
  Warnings:

  - You are about to drop the column `field` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Team` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fieldId` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fieldId` to the `Team` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Game" DROP COLUMN "field",
ADD COLUMN     "fieldId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Team" DROP COLUMN "location",
ADD COLUMN     "fieldId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "teamId" INTEGER,
ALTER COLUMN "role" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_fieldId_fkey" FOREIGN KEY ("fieldId") REFERENCES "Field"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_fieldId_fkey" FOREIGN KEY ("fieldId") REFERENCES "Field"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;
