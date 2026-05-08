import { http } from "./http";

export const getAllUsages = () => {
  return http.get("/usage").then((res: any) => res.data.api_usages);
};

export const getUsageByKey = (apiKeyId: number) => {
  return http.get(`/usage/${apiKeyId}`).then((res: any) => res.data.api_usage);
};

export const getUsageByKeyList = async () => {
  const res = await http.get("/usage/by-key");
  return res.data;
};

export const getUsageSummary = async (apiKeyId?: string) => {
  const url = apiKeyId ? `/usage/summary/${apiKeyId}` : "/usage/summary";

  const res = await http.get(url);
  return res.data.summary;
};

export const getUsageChart = async (apiKeyId?: string) => {
  const url = apiKeyId ? `/usage/chart/${apiKeyId}` : "/usage/chart";

  const res = await http.get(url);
  return res.data.chart;
};

export const getUsageLogs = async (apiKeyId?: string) => {
  const url = apiKeyId ? `/usage/${apiKeyId}` : "/usage";

  const res = await http.get(url);
  return res.data.api_usages;
};
