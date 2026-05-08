import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLogs } from "@/hooks/useLogs";
import { useGetAllApiKeys } from "@/hooks/useGetAllApiKeys";

export function RequestLogs() {
  const [selectedApi, setSelectedApi] = useState<string>("all");

  const apiKeyId =
    selectedApi === "all" ? undefined : Number(selectedApi);

  const { data: logs = [], isLoading } = useLogs(apiKeyId);
  const { data: keys = [] } = useGetAllApiKeys();

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center justify-between pb-5">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Live Logs
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Last 50 API transactions (live)
            </p>
          </div>

          <select
            className="border rounded-md px-3 py-2 text-sm bg-white"
            value={selectedApi}
            onChange={(e) => setSelectedApi(e.target.value)}
          >
            <option value="all">All API Keys</option>

            {keys.map((key: any) => (
              <option key={key.id} value={key.id}>
                {key.key_prefix}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-5 border-t" />

        <Card className="overflow-hidden border-border/50 py-0">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-sm font-medium mb-4">
              <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              LIVE FEED
            </div>

            {isLoading ? (
              <p className="text-sm text-muted-foreground">
                Loading logs...
              </p>
            ) : (
              <div className="space-y-2">
                {logs.slice(0, 10).map((log: any) => (
                  <div
                    key={log.id}
                    className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-muted/30 transition font-mono text-sm"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-muted-foreground w-20">
                        {new Date(log.created_at).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        })}
                      </span>

                      <Badge
                        variant="outline"
                        className="text-blue-600 border-blue-500/40"
                      >
                        {log.method}
                      </Badge>

                      <span className="text-foreground">
                        {log.path}
                      </span>

                      <span className="text-muted-foreground">
                        {log.api_key?.key_prefix}
                      </span>
                    </div>

                    <div className="flex items-center gap-4">
                      <Badge
                        variant="outline"
                        className={`${
                          log.status_code >= 500
                            ? "text-red-500 border-red-500/40"
                            : log.status_code >= 400
                            ? "text-yellow-500 border-yellow-500/40"
                            : "text-green-600 border-green-500/40"
                        }`}
                      >
                        {log.status_code}
                      </Badge>

                      <span className="text-xs text-muted-foreground">
                        {log.response_time}ms
                      </span>

                      <span className="text-xs text-muted-foreground">
                        live
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}