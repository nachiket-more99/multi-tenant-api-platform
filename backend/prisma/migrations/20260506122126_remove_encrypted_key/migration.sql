/*
  Warnings:

  - You are about to drop the column `encrypted_key` on the `ApiKey` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[tenant_id,hash_key]` on the table `ApiKey` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "ApiKey_tenant_id_encrypted_key_key";

-- AlterTable
ALTER TABLE "ApiKey" DROP COLUMN "encrypted_key";

-- CreateIndex
CREATE UNIQUE INDEX "ApiKey_tenant_id_hash_key_key" ON "ApiKey"("tenant_id", "hash_key");
