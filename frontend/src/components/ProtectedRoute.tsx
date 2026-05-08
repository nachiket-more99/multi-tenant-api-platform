import { Navigate } from "react-router-dom";
import { useMe } from "@/hooks/useMe";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoading, isError } = useMe();

  if (isLoading) return null; 

  if (isError) {
    return <Navigate to="/login" replace />;
  }

  return children;
};