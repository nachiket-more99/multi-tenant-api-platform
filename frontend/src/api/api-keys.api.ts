import { http } from "./http";

export const getKeysByTenant = () => {
  return http.get('/api-key/').then((res: any) => res.data.api_keys);
};

export const deleteApiKey = async (id: number) => {
  const response = await http.delete(`/api-key/${id}`);
  return response.data;
};

export const createApiKey = async () => {
  const response = await http.post("/api-key/create");
  return response.data;
};