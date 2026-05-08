import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { getBooks } from "@/api/books.api";

export function TestBooks() {
  const [apiKey, setApiKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);

  const endpoint = "/books/all";

  const sendRequest = async () => {
    if (!apiKey.trim()) return;

    setLoading(true);
    setResponse(null);

    const start = performance.now();

    try {
      const res = await getBooks(apiKey.trim());

      const end = performance.now();

      setResponse({
        data: res,
        meta: {
          status: 200,
          responseTime: Math.round(end - start),
        },
      });
    } catch (err: any) {
      setResponse({
        error: err?.response?.data?.error || "Request failed",
        meta: {
          status: err?.response?.status || 500,
          responseTime: 0,
        },
      });
    }

    setLoading(false);
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div>
        <h1 className="text-2xl font-semibold">Test Books API</h1>
        <p className="text-sm text-gray-500">
          Test your API key directly like Postman
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-5 space-y-5">
            <h2 className="text-lg font-semibold">Request Builder</h2>

            <div>
              <p className="text-sm text-gray-500 mb-1">API Key</p>

              <input
                className="w-full border p-2 rounded bg-white font-mono text-sm"
                placeholder="Paste your API key here"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">Endpoint</p>

              <div className="flex items-center gap-2 bg-gray-100 p-2 rounded">
                <Badge>GET</Badge>
                <span className="font-mono text-sm">{endpoint}</span>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-2">Request Headers</p>

              <pre className="text-xs bg-gray-100 p-3 rounded overflow-auto">
                {`GET ${endpoint} HTTP/1.1
Authorization: Bearer ${apiKey || "<your_api_key>"}
Content-Type: application/json
X-Tenant-ID: 2`}
              </pre>
            </div>

            <Button onClick={sendRequest} disabled={loading}>
              {loading ? "Sending..." : "Send Request"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 space-y-3">
            <h2 className="text-lg font-semibold">Response</h2>

            {loading && <p className="text-gray-400">Loading...</p>}

            {!loading && response && (
              <>
                <pre className="text-xs bg-gray-100 p-3 rounded overflow-auto">
                  {`HTTP/1.1 ${response?.meta?.status || 200} OK
Content-Type: application/json
X-Response-Time: ${response?.meta?.responseTime || 0}ms`}
                </pre>

                <pre className="text-xs bg-gray-100 p-3 rounded overflow-auto">
                  {JSON.stringify(response, null, 2)}
                </pre>
              </>
            )}

            {!loading && !response && (
              <p className="text-gray-400">No response yet</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
