/*
  Warnings:

  - A unique constraint covering the columns `[rfidTag]` on the table `Subscription` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "rfidTag" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_rfidTag_key" ON "Subscription"("rfidTag");
