/*
  Warnings:

  - Added the required column `created_by` to the `ApiKey` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hash_key` to the `ApiKey` table without a default value. This is not possible if the table is not empty.
  - Added the required column `key_prefix` to the `ApiKey` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ApiKey" ADD COLUMN     "created_by" INTEGER NOT NULL,
ADD COLUMN     "hash_key" TEXT NOT NULL,
ADD COLUMN     "key_prefix" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ApiKey" ADD CONSTRAINT "ApiKey_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
