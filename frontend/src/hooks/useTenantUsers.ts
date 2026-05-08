import { useQuery } from "@tanstack/react-query";
import { getTenantUsers } from "@/api/tenant.api";

export const useTenantUsers = () =>
  useQuery({
    queryKey: ["tenant-users"],
    queryFn: getTenantUsers,
  });