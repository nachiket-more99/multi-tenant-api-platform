import { http } from "./http";

export const getAllUsages = () => {
  return http.get("/usage").then((res: any) => res.data.api_usages);
};

export const getUsageByKey = (apiKeyId: number) => {
  return http.get(`/usage/${apiKeyId}`).then((res: any) => res.data.api_usage);
};