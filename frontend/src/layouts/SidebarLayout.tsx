import SidebarComponent from "../components/SidebarComponent";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { http } from "@/api/http";

export function SidebarLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await http.get("/user/me");
      } catch (err) {
        navigate("/login", { replace: true });
      }
    };

    checkAuth();
  }, [location.pathname, navigate]);
    return (
    <div className="min-h-screen">
      <SidebarComponent />
    </div>
  );
}