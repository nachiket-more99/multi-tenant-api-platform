import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { Badge } from "@/components/ui/badge";

import {
  getUsageByKeyList,
  getUsageSummary,
  getUsageChart,
  getUsageLogs,
} from "@/api/usage.api";

type Key = {
  api_key_id: number;
  key_prefix: string;
};

type Summary = {
  today_requests: number;
  week_requests: number;
  active_keys: number;
  yesterday_requests?: number;
  last_week_requests?: number;
};

type ChartPoint = {
  date: string;
  count: number;
};

type Log = {
  id: number;
  tenant_id: number;
  api_key_id: number;
  path: string;           
  count: number;
  date: string;
  api_id: {
    key_prefix: string;
  }
};

export function ApiUsage() {
  const [keys, setKeys] = useState<Key[]>([]);
  const [selectedKey, setSelectedKey] = useState<string>("all");

  const [summary, setSummary] = useState<Summary | null>(null);
  const [chart, setChart] = useState<ChartPoint[]>([]);
  const [logs, setLogs] = useState<Log[]>([]);

  const [loading, setLoading] = useState(false);

useEffect(() => {
  getUsageByKeyList().then((res) => setKeys(res.usage ?? []));
}, []);

  useEffect(() => {
    loadData();
  }, [selectedKey]);

async function loadData() {
  setLoading(true);
  const key = selectedKey === "all" ? undefined : selectedKey;

  const [s, c, l] = await Promise.all([
    getUsageSummary(key),
    getUsageChart(key),
    getUsageLogs(key),
  ]);

  console.log("summary:", s);
  console.log("chart:", c);
  console.log("logs:", l);   

  setSummary(s ?? null);
  setChart(c ?? []);
  setLogs(l ?? []);

  setLoading(false);
}

  const todayChange =
    summary?.yesterday_requests
      ? ((summary.today_requests -
          summary.yesterday_requests) /
          summary.yesterday_requests) *
        100
      : 0;

  const weekChange =
    summary?.last_week_requests
      ? ((summary.week_requests -
          summary.last_week_requests) /
          summary.last_week_requests) *
        100
      : 0;

  const color = (v: number) =>
    v >= 0 ? "text-green-600" : "text-red-500";

  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between pb-5">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            API Usage Analytics
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Track usage across all API keys
          </p>
        </div>

        <select
          className="border rounded-md px-3 py-2 text-sm bg-white"
          value={selectedKey}
          onChange={(e) =>
            setSelectedKey(e.target.value)
          }
        >
          <option value="all">All API Keys</option>

          {keys.map((k) => (
            <option
              key={k.api_key_id}
              value={k.api_key_id}
            >
              {k.key_prefix}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              Today Requests
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="text-3xl font-semibold">
              {summary?.today_requests || 0}
            </div>

            <p className={`text-sm mt-1 ${color(todayChange)}`}>
              {todayChange >= 0 ? "↑" : "↓"}{" "}
              {Math.abs(todayChange).toFixed(1)}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              This Week
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="text-3xl font-semibold">
              {summary?.week_requests || 0}
            </div>

            <p className={`text-sm mt-1 ${color(weekChange)}`}>
              {weekChange >= 0 ? "↑" : "↓"}{" "}
              {Math.abs(weekChange).toFixed(1)}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              Active Keys
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="text-3xl font-semibold">
              {summary?.active_keys || 0}
            </div>

            <p className="text-sm text-muted-foreground mt-1">
              total keys
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Usage Over Time</CardTitle>
        </CardHeader>

        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chart}>
              <XAxis
                dataKey="date"
                tickFormatter={(v) =>
                  new Date(v).toLocaleDateString()
                }
              />
              <YAxis />
              <Tooltip
                labelFormatter={(v) =>
                  new Date(v).toLocaleString()
                }
              />
              <Area
                type="monotone"
                dataKey="count"
                stroke="#6366f1"
                fill="#6366f1"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>API Usage Logs</CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">

              <thead className="bg-muted/40 text-muted-foreground">
                <tr>
                  <th className="px-6 py-4 text-left">
                    API KEY
                  </th>
                  <th className="px-6 py-4 text-left">
                    DATE
                  </th>
                  <th className="px-6 py-4 text-left">
                    REQUESTS
                  </th>
                  <th className="px-6 py-4 text-left">PATH</th>
                </tr>
              </thead>

              <tbody>
                {logs.map((l, i) => (
                  <tr
                    key={i}
                    className="border-b hover:bg-muted/30"
                  >
                    <td className="px-6 py-4">
                      <Badge variant="outline" 
                            className="rounded-[10%] border-blue-500/30 bg-blue-500/5 text-blue-500">
                        {l.api_key.key_prefix}
                      </Badge>
                    </td>

                    <td className="px-6 py-4 text-muted-foreground">
                      {new Date(l.date).toLocaleString()}
                    </td>

                    <td className="px-6 py-4">
                      {l.count}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{l.path}</td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </CardContent>
      </Card>

      {loading && (
        <p className="text-sm text-muted-foreground">
          Loading analytics...
        </p>
      )}
    </div>
  );
}