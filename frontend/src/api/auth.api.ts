import { http } from "./http";

export const register = (email: string, password: string) => {
  return http.post("/auth/register", { email, password}).then((res: any) => res.data);
};

export const login = (email: string, password: string) => {
  return http.post("/auth/login", { email, password}).then((res: any) => res.data);
};

export const logout = () => {
  return http.post("/auth/logout");
};