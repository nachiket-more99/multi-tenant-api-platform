/*
  Warnings:

  - You are about to drop the column `key_hash` on the `ApiKey` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[tenant_id,encrypted_key]` on the table `ApiKey` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "ApiKey_tenant_id_key_hash_key";

-- AlterTable
ALTER TABLE "ApiKey" DROP COLUMN "key_hash",
ALTER COLUMN "encrypted_key" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "ApiKey_tenant_id_encrypted_key_key" ON "ApiKey"("tenant_id", "encrypted_key");
