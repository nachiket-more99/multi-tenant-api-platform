import { Outlet, useNavigate } from "react-router-dom";
import {
  Link2,
  LogOut,
  KeyRound,
  Logs,
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
import { Button } from "./ui/button";
import { useMe } from "../hooks/useMe";
import { useState } from "react";
import { InfoDialog } from "@/components/common/InfoDialog";
import { Badge } from "./ui/badge";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTenantName, addTenantMember } from "@/api/tenant.api";
import { useTenantUsers } from "@/hooks/useTenantUsers";

const nav = [
  { title: "API Keys", url: "/api-keys", icon: KeyRound },
  { title: "Usage", url: "/usage", icon: Activity },
  { title: "Request Logs", url: "/logs", icon: Logs },
  { title: "Books API", url: "/test-books", icon: BookOpen },
];

export default function SidebarComponent() {
  

  const [openTenantDialog, setOpenTenantDialog] = useState(false);
  const navigate = useNavigate();
  const { data: user, isError } = useMe();
  const isAdmin = user?.role === "ADMIN";

const queryClient = useQueryClient();

const [editName, setEditName] = useState(false);
const [tenantName, setTenantName] = useState(user?.tenant?.name ?? "");
const [memberEmail, setMemberEmail] = useState("");
const [memberError, setMemberError] = useState<string | null>(null);
const [memberSuccess, setMemberSuccess] = useState<string | null>(null);

const { data: members = [], refetch } = useTenantUsers();

const addMemberMutation = useMutation({
  mutationFn: addTenantMember,

  onSuccess: async () => {
    await queryClient.invalidateQueries({
      queryKey: ["tenant-users"],
    });

    setMemberSuccess("Member added successfully");
    setMemberError(null);

    setMemberEmail("");
  },

  onError: (err: any) => {
    setMemberSuccess(null);

    setMemberError(
      err?.response?.data?.error ||
      err?.message ||
      "Failed to add member"
    );
  },
});


const updateTenantMutation = useMutation({
  mutationFn: updateTenantName,
  onSuccess: (data) => {
    queryClient.invalidateQueries({ queryKey: ["me"] });
    setEditName(false);
  },
});

  const handleLogout = async () => {
    await logout();
    queryClient.clear();
    navigate("/login");
  };

  if (isError || !user) {
    navigate("/login");
    return null;
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar className="bg-sidebar-background border-r">
          <div className="flex h-16 items-center gap-2 px-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary">
              <Link2 className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-sidebar-primary-foreground">
              API Platform
            </span>
          </div>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="text-sidebar-primary-foreground/70">
                ACCESS
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {nav.slice(0, 3).map((item) => (
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
<div
  onClick={() => setOpenTenantDialog(true)}
  className="cursor-pointer rounded-lg border border-sidebar-primary-foreground/15 bg-sidebar-accent/30 px-3 py-2 my-2 hover:bg-sidebar-accent/50 transition shadow-sm"
>
  <p className="text-sm font-medium text-sidebar-primary-foreground">
    {user?.tenant?.name}
  </p>

  <p className="text-xs text-sidebar-primary-foreground/50 mt-0.5">
    {user?.role} · {user?.email}
  </p>
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
      <InfoDialog
  open={openTenantDialog}
  onOpenChange={setOpenTenantDialog}
  title="Tenant Info"
  description="Workspace details and members"
>
    <div className="space-y-4">
  {/* Tenant Info */}
  <div className="rounded-md border p-3 space-y-2">
    {editName ? (
      <div className="flex gap-2">
        <input
          className="w-full border rounded-md px-2 py-1 text-sm"
          value={tenantName}
          onChange={(e) => setTenantName(e.target.value)}
        />

        <Button
          size="sm"
          onClick={() =>
            updateTenantMutation.mutate(tenantName)
          }
          disabled={updateTenantMutation.isPending}
        >
          Save
        </Button>

        <Button
          size="sm"
          variant="ghost"
          onClick={() => {
            setEditName(false);
            setTenantName(user?.tenant?.name ?? "");
          }}
        >
          Cancel
        </Button>
      </div>
    ) : (
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">
          {user?.tenant?.name}
        </p>

{isAdmin && (
  <Button
    size="sm"
    variant="outline"
    onClick={() => setEditName(true)}
  >
    Edit
  </Button>
)}
      </div>
    )}

    <p className="text-xs text-muted-foreground">
      Role: {user?.role} · {user?.email}
    </p>
  </div>

    {/* Members */}
<div>
  <p className="text-sm font-medium mb-2">
    Members ({members.length})
  </p>

  {/* Add member input */}
  {isAdmin && (
  <div className="flex flex-col gap-2 mb-3">
  <div className="flex gap-2">
    <input
      className="w-full border rounded-md px-2 py-1 text-sm"
      placeholder="Enter email"
      value={memberEmail}
      onChange={(e) => {
        setMemberEmail(e.target.value);
        setMemberError(null);
        setMemberSuccess(null);
      }}
    />

    <Button
      size="sm"
      onClick={() =>
        addMemberMutation.mutate(memberEmail)
      }
      disabled={
        !memberEmail.trim() ||
        addMemberMutation.isPending
      }
    >
      Add
    </Button>
  </div>

  {/* ERROR */}
  {memberError && (
    <p className="text-xs text-red-500">
      {memberError}
    </p>
  )}

  {/* SUCCESS */}
  {memberSuccess && (
    <p className="text-xs text-green-500">
      {memberSuccess}
    </p>
  )}
</div>
)}

  {/* Members list */}
  <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
    {members.length ? (
  members.map((m: any) => (
    <div
      key={m.id}
      className="flex items-center justify-between border rounded-md px-3 py-2"
    >
      <span className="text-sm">{m.email}</span>

      <Badge variant="outline">{m.role}</Badge>
    </div>
  ))
) : (
  <p className="text-sm text-muted-foreground">
    No members found
  </p>
)}
  </div>
</div>
  </div>
</InfoDialog>
    </SidebarProvider>
    
  );
}
