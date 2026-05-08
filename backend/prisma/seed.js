import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding...");

  // ---------------- 1. TENANT ----------------
  const tenant = await prisma.tenant.create({
    data: {
      name: "Demo Tenant",
    },
  });

  // ---------------- 2. API KEY ----------------
  const apiKey = await prisma.apiKey.create({
    data: {
      tenant_id: tenant.id,
      created_by: 1,
      key_prefix: "demo_123",
      hash_key: "hashed_key",
      rate_limit: 100,
      is_active: true,
    },
  });

  // ---------------- 3. REQUEST LOGS ----------------
  await prisma.requestLog.createMany({
    data: [
      {
        tenant_id: tenant.id,
        api_key_id: apiKey.id,
        path: "/books/all",
        method: "GET",
        status_code: 200,
        response_time: 120,
      },
      {
        tenant_id: tenant.id,
        api_key_id: apiKey.id,
        path: "/books/all",
        method: "GET",
        status_code: 200,
        response_time: 90,
      },
    ],
  });

  // ---------------- 4. API USAGE ----------------
  await prisma.apiUsage.createMany({
    data: [
      {
        tenant_id: tenant.id,
        api_key_id: apiKey.id,
        path: "/books/all",
        count: 10,
        date: new Date("2026-05-06"),
      },
      {
        tenant_id: tenant.id,
        api_key_id: apiKey.id,
        path: "/books/all",
        count: 25,
        date: new Date("2026-05-07"),
      },
    ],
  });

  console.log("✅ Seeding complete");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());