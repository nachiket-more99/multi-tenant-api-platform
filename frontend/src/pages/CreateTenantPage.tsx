import { createTenant } from "../api/tenant.api.ts";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function CreateTenantPage() {
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: createTenant,

    onSuccess: () => {
      navigate("/api-keys");
      window.location.reload();
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-xl border p-6 space-y-4">
        <div>
          <h1 className="text-2xl font-semibold">
            Create Tenant
          </h1>

          <p className="text-sm text-muted-foreground mt-1">
            Create your organization workspace
          </p>
        </div>

        <input
          className="w-full border rounded-md px-3 py-2"
          placeholder="Tenant name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Button
          className="w-full"
          onClick={() => mutation.mutate(name)}
          disabled={!name.trim()}
        >
          Create Tenant
        </Button>
      </div>
    </div>
  );
}