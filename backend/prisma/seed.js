import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import crypto from "crypto";

import { tenants } from "./seed/tenants.js";
import { users } from "./seed/users.js";
import { apiKeys } from "./seed/apiKeys.js";
import { requestLogs } from "./seed/requestLogs.js";
import { apiUsage } from "./seed/apiUsage.js";

const prisma = new PrismaClient();

async function main() {
  await prisma.requestLog.deleteMany();
  await prisma.apiUsage.deleteMany();
  await prisma.apiKey.deleteMany();
  await prisma.user.deleteMany();
  await prisma.tenant.deleteMany();

  console.log("Seeding DB...");

  // TENANTS
  const createdTenants = [];

  for (const t of tenants) {
    const created = await prisma.tenant.create({
      data: t,
    });

    createdTenants.push(created);
  }

  // USERS
  const createdUsers = [];

  for (const u of users) {
    const hashedPassword = await bcrypt.hash(
      u.password,
      10
    );

    const created = await prisma.user.create({
      data: {
        email: u.email,
        role: u.role,
        hash_password: hashedPassword,
        tenant_id:
          createdTenants[u.tenantIndex].id,
      },
    });

    createdUsers.push(created);
  }

  // API KEYS
  const createdKeys = [];

  for (const k of apiKeys) {
    const tenant =
      createdTenants[k.tenantIndex];

    const creator = createdUsers.find(
      (u) =>
        u.tenant_id === tenant.id &&
        u.role === "ADMIN"
    );

    const created =
      await prisma.apiKey.create({
        data: {
          tenant_id: tenant.id,
          created_by: creator.id,

          key_prefix: k.prefix,
          rate_limit: k.rate_limit,

          hash_key: `seed_${crypto.randomUUID()}`,

          is_active: true,
        },
      });

    createdKeys.push(created);
  }

  // REQUEST LOGS
  for (let i = 0; i < 100; i++) {
    const key =
      createdKeys[
        i % createdKeys.length
      ];

    const log =
      requestLogs[
        i % requestLogs.length
      ];

    await prisma.requestLog.create({
      data: {
        tenant_id: key.tenant_id,
        api_key_id: key.id,

        path: log.path,
        method: log.method,
        status_code: log.status_code,
        response_time:
          log.response_time,

        created_at: new Date(
          Date.now() -
            Math.floor(
              Math.random() * 7
            ) *
              24 *
              60 *
              60 *
              1000
        ),
      },
    });
  }

  // API USAGE
  for (let i = 0; i < 30; i++) {
    const key =
      createdKeys[
        i % createdKeys.length
      ];

    const usage =
      apiUsage[
        i % apiUsage.length
      ];

    await prisma.apiUsage.create({
      data: {
        tenant_id: key.tenant_id,
        api_key_id: key.id,

        path: usage.path,
        count: usage.count,

        date: new Date(
          Date.now() -
            i *
              24 *
              60 *
              60 *
              1000
        ),
      },
    });
  }

  console.log("Seeding complete");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });