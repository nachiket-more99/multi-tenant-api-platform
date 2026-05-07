import { http } from "./http";

export const getKeysByTenant = (tenantId: number) => {
  return http.get(`/keys/tenant/${tenantId}`).then((res: any) => res.data.api_keys);
};