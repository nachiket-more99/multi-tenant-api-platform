import { prisma } from "../../lib/prisma.js";
import { AppError } from "../../utils/AppError.js";

export const getApiUsageService = async (user, api_key_id) => {
  const apiKeyId = Number(api_key_id);

  if (isNaN(apiKeyId)) {
    throw new AppError("Invalid api_key_id", 400);
  }

  const key = await prisma.apiKey.findUnique({
    where: { id: apiKeyId },
  });

  if (!key) {
    throw new AppError("API key not found", 404);
  }

  if (key.tenant_id !== user.tenantId) {
    throw new AppError("Unauthorized", 403);
  }

  const usage = await prisma.apiUsage.findMany({
    where: { api_key_id: apiKeyId },
    include: {
      api_key: {
        select: {
          key_prefix: true,
        },
      },
    },
    orderBy: { date: "desc" },
  });

  return usage;
};

export const getAllApiUsagesService = async (user) => {
  if (!user.tenantId) {
    throw new AppError("User not assigned to tenant", 400);
  }

  return prisma.apiUsage.findMany({
    where: {
      tenant_id: Number(user.tenantId),
    },
    include: {
      api_key: {
        select: {
          key_prefix: true,
        },
      },
    },
    orderBy: {
      date: "desc",
    },
  });
};

export const getUsageSummaryService = async (user, api_key_id) => {
  const now = new Date();

  const today = new Date(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate()
  );

  const weekStart = new Date(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate() - 7
  );
    
  const whereClause = {
    tenant_id: Number(user.tenantId),
    ...(api_key_id ? { api_key_id: Number(api_key_id) } : {}),
  };


  const todayUsage = await prisma.apiUsage.aggregate({
    where: {
    ...whereClause,
      date: { gte: today },
    },
    _sum: { count: true },
  });

  const weekUsage = await prisma.apiUsage.aggregate({
    where: {
    ...whereClause,
      date: {
        gte: weekStart,
        lte: now,
      },
    },
    _sum: { count: true },
  });

  const activeKeys = await prisma.apiKey.count({
    where: {
      tenant_id: Number(user.tenantId),
      is_active: true,
    },
  });

  return {
    today_requests: todayUsage._sum.count || 0,
    week_requests: weekUsage._sum.count || 0,
    active_keys: activeKeys,
  };
};

export const getUsageChartService = async (user, api_key_id) => {
  const whereClause = {
    tenant_id: Number(user.tenantId),
    ...(api_key_id ? { api_key_id: Number(api_key_id) } : {}),
  };

  const chart = await prisma.apiUsage.groupBy({
    by: ["date"],

    where: whereClause,

    _sum: {
      count: true,
    },

    orderBy: {
      date: "asc",
    },
  });

  return chart.map((item) => ({
    date: item.date,
    count: item._sum.count || 0,
  }));
};

export const getEndpointUsageService = async (user, api_key_id) => {
  const whereClause = {
    tenant_id: Number(user.tenantId),
    ...(api_key_id ? { api_key_id: Number(api_key_id) } : {}),
  };

  const endpoints = await prisma.apiUsage.groupBy({
    by: ["path"],

    where: whereClause,

    _sum: {
      count: true,
    },
  });

  return endpoints.map((item) => ({
    path: item.path,
    count: item._sum.count || 0,
  }));
};

export const getUsageByKeyService = async (user) => {
  const usage = await prisma.apiUsage.groupBy({
    by: ["api_key_id"],

    where: {
      tenant_id: Number(user.tenantId),
    },

    _sum: {
      count: true,
    },
  });

  const keys = await prisma.apiKey.findMany({
    where: {
      tenant_id: Number(user.tenantId),
    },

    select: {
      id: true,
      key_prefix: true,
    },
  });

  return usage.map((item) => {
    const key = keys.find((k) => k.id === item.api_key_id);

    return {
      api_key_id: item.api_key_id,
      key_prefix: key?.key_prefix || "Unknown",
      count: item._sum.count || 0,
    };
  });
};
