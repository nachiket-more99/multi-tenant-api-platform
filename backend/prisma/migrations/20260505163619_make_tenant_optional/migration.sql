-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_tenant_id_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "tenant_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "Tenant"("id") ON DELETE SET NULL ON UPDATE CASCADE;
