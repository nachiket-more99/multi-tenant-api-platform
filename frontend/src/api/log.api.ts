import { http } from "./http";

export const getAllLogs = () => {
  return http.get("/logs/all").then((res: any) => res.data.logs);
};

export const getLogsByKey = (apiKeyId: number) => {
  return http.get(`/logs/all/${apiKeyId}`).then((res: any) => res.data.logs);
};