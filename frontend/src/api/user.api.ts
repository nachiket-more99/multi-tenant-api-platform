import { http } from "./http";

export const getMe = () => {
  return http.get("/user/me").then((res: any) => res.data.user);
};