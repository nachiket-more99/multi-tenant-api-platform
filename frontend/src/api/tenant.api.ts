import { http } from "./http";

export const updateTenantName = async (name: string) => {
  const { data } = await http.patch("/tenant", {
    name,
  });

  return data;
};

export const addTenantMember = async (email: string) => {
  const { data } = await http.post("/tenant/add-user", {
    email,
  });

  return data;
};

export const getTenantUsers = async () => {
  const { data } = await http.get("/tenant/users");
  return data.users;
};