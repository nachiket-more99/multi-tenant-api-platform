import { Outlet, useNavigate } from "react-router-dom";
import { 
  Link2, 
  LogOut,
  LayoutDashboard,
  KeyRound,
  ScrollText,
  BookOpen,
  Activity,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { logout } from "@/api/auth.api";
// import { useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { useState } from "react";
// import { useMe } from "./hooks/useMe";

const nav = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "API Keys", url: "/api-keys", icon: KeyRound },
  { title: "Usage", url: "/usage", icon: Activity },
  { title: "Request Logs", url: "/logs", icon: ScrollText },
  { title: "Books API", url: "/test-books", icon: BookOpen },
];

export default function SidebarComponent() {
  const navigate = useNavigate();
//   const { data: user, isError } = useMe();

//   const queryClient = useQueryClient();

  const handleLogout = async () => {
    await logout();
    // queryClient.clear();
    navigate("/login");
  };

//   if (isError || !user) {
//     navigate("/login");
//     return null;
//   }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar className="bg-sidebar-background border-r">
          <div className="flex h-16 items-center gap-2 px-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary">
              <Link2 className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-sidebar-primary-foreground">API Platform</span>
          </div>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="text-sidebar-primary-foreground/70">
                OVERVIEW
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {nav.slice(0, 1).map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <NavLink
                        to={item.url}
                        end
                        className={({ isActive }) =>
                          isActive
                            ? "bg-sidebar-accent text-sidebar-primary-foreground font-medium flex items-center px-2 py-2 rounded"
                            : "flex items-center px-2 py-2 rounded text-sidebar-primary-foreground"
                        }
                      >
                        <item.icon className="mr-4 h-4 w-4" />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>

              <SidebarGroupLabel className="text-sidebar-primary-foreground/70">
                ACCESS
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {nav.slice(1, 4).map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <NavLink
                        to={item.url}
                        end
                        className={({ isActive }) =>
                          isActive
                            ? "bg-sidebar-accent text-sidebar-primary-foreground font-medium flex items-center px-2 py-2 rounded"
                            : "flex items-center px-2 py-2 rounded text-sidebar-primary-foreground"
                        }
                      >
                        <item.icon className="mr-4 h-4 w-4" />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>

              <SidebarGroupLabel className="text-sidebar-primary-foreground/70">
                TEST
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {nav.slice(-1).map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <NavLink
                        to={item.url}
                        end
                        className={({ isActive }) =>
                          isActive
                            ? "bg-sidebar-accent text-sidebar-primary-foreground font-medium flex items-center px-2 py-2 rounded"
                            : "flex items-center px-2 py-2 rounded text-sidebar-primary-foreground"
                        }
                      >
                        <item.icon className="mr-4 h-4 w-4" />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="p-4">
            <SidebarMenu>
              <SidebarMenuItem>
                <div className="pl-2 py-1.5 pr-11">
                  <p className="text-sm font-medium text-sidebar-primary-foreground pb-1">Test Corp</p>
                  <p className="text-xs text-sidebar-primary-foreground/70">ADMIN · nachiket@email.com</p>
                </div>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-sidebar-primary-foreground w-full px-2 py-1.5 flex items-center gap-2 justify-start hover:bg-destructive/10 hover:text-destructive transition-colors"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4" />
                  <span className="font-normal">Log out</span>
                </Button>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <div className="flex flex-1 flex-col">
          
          <main className="flex-1 p-4">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}