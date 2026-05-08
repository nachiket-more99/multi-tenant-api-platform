import { http } from "./http";

export const getBooks = (apiKey: string) => {
  return http.get("/books/all", {
    headers: {
      Authorization: `Bearer ${apiKey}`, 
    },
  }).then(res => res.data);
};