import { useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  ArrowUpRight,
  Trash2,
  Plus,
  Copy,
  Check,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import { InfoDialog } from "@/components/common/InfoDialog";

import {
  createApiKey,
  deleteApiKey,
} from "../api/api-keys.api";

import { useGetAllApiKeys } from "../hooks/useGetAllApiKeys";

export type ApiKey = {
  id: number;
  tenant_id: number;
  created_by: number;
  hash_key: string;
  key_prefix: string;
  rate_limit: number;
  is_active: boolean;
  last_used: Date;
  created_at: Date;

  creator: {
    email: string;
  };
};

export function ApiKeys() {
  const queryClient = useQueryClient();

  const [generatedKey, setGeneratedKey] =
    useState("");

  const [copied, setCopied] =
    useState(false);

  const [
    openGeneratedDialog,
    setOpenGeneratedDialog,
  ] = useState(false);

  const {
    data: apikeys = [],
    isLoading,
  } = useGetAllApiKeys();

  const createMutation = useMutation({
    mutationFn: createApiKey,

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["api-keys"],
      });

      setGeneratedKey(
        data.api_key.api_key
      );

      setOpenGeneratedDialog(true);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteApiKey,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["api-keys"],
      });
    },
  });

  const handleCopy = async () => {
    await navigator.clipboard.writeText(
      generatedKey
    );

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  if (isLoading) {
    return (
      <div className="text-muted-foreground">
        Loading API keys...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center justify-between pb-5">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              API Keys
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              Manage tenant keys · Raw key shown once
              only
            </p>
          </div>

          <ConfirmDialog
            title="Generate API Key?"
            description="The raw key will only be shown once."
            confirmText="Generate"
            onConfirm={() =>
              createMutation.mutate()
            }
          >
            <Button
              variant="outline"
              className="gap-2"
              disabled={
                createMutation.isPending
              }
            >
              <Plus className="h-4 w-4" />

              {createMutation.isPending
                ? "Generating..."
                : "Generate Key"}
            </Button>
          </ConfirmDialog>
        </div>

        <div className="mb-5 border-t" />

        <Card className="overflow-hidden border-border/50 py-0">
          <CardContent className="p-0">
            {apikeys.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                <ArrowUpRight className="mb-2 h-8 w-8" />

                <p className="font-medium">
                  No API keys found
                </p>

                <p className="text-sm">
                  Generate a new API key to get
                  started
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted/40 text-muted-foreground">
                    <tr className="border-b">
                      <th className="px-6 py-4 text-left font-medium">
                        KEY
                      </th>

                      <th className="px-6 py-4 text-left font-medium">
                        CREATED AT
                      </th>

                      <th className="px-6 py-4 text-left font-medium">
                        RATE LIMIT
                      </th>

                      <th className="px-6 py-4 text-left font-medium">
                        STATUS
                      </th>

                      <th className="px-6 py-4 text-left font-medium">
                        CREATOR
                      </th>

                      <th className="px-6 py-4 text-left font-medium">
                        LAST USED
                      </th>

                      <th className="px-6 py-4 text-left font-medium">
                        ACTIONS
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {apikeys.map((key: ApiKey) => (
                      <tr
                        key={key.id}
                        className="border-b transition-colors hover:bg-muted/30"
                      >
                        <td className="px-6 py-4">
                          <Badge
                            variant="outline"
                            className="rounded-[10%] border-blue-500/30 bg-blue-500/5 text-blue-500"
                          >
                            {key.key_prefix}
                          </Badge>
                        </td>

                        <td className="px-6 py-4 text-muted-foreground">
                          {new Date(
                            key.created_at
                          ).toLocaleString()}
                        </td>

                        <td className="px-6 py-4 text-muted-foreground">
                          {key.rate_limit}/min
                        </td>

                        <td className="px-6 py-4">
                          <Badge
                            variant="outline"
                            className={`rounded-[50px] ${
                              key.is_active
                                ? "border-green-500/30 bg-green-500/5 text-green-500"
                                : "border-red-500/30 bg-red-500/5 text-red-500"
                            }`}
                          >
                            {key.is_active
                              ? "Active"
                              : "Revoked"}
                          </Badge>
                        </td>

                        <td className="px-6 py-4 text-muted-foreground">
                          {key.creator.email}
                        </td>

                        <td className="px-6 py-4">
                          {key.last_used ? (
                            <span className="text-green-500">
                              {new Date(
                                key.last_used
                              ).toLocaleString()}
                            </span>
                          ) : (
                            <span className="text-muted-foreground">
                              Never
                            </span>
                          )}
                        </td>

                        <td className="px-6 py-4">
                          <ConfirmDialog
                            title="Delete API Key?"
                            description="This action cannot be undone."
                            confirmText="Delete"
                            destructive
                            onConfirm={() =>
                              deleteMutation.mutate(
                                key.id
                              )
                            }
                          >
                            <Button
                              size="icon"
                              variant="ghost"
                              className="text-red-500 hover:bg-red-500/10 hover:text-red-500"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </ConfirmDialog>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <InfoDialog
        open={openGeneratedDialog}
        onOpenChange={
          setOpenGeneratedDialog
        }
        title="API Key Generated"
        description="This key will only be shown once. Copy and store it securely."
      >
        <div className="rounded-md border bg-muted/40 p-4">
          <div className="flex items-center justify-between gap-3">
            <code className="break-all text-sm">
              {generatedKey}
            </code>

            <Button
              size="icon"
              variant="outline"
              onClick={handleCopy}
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </InfoDialog>
    </div>
  );
}