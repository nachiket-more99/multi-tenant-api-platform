import { Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Dashboard } from "./pages/Dashboard";
import { SidebarLayout } from "./layouts/SidebarLayout";
import { ApiKeys } from "./pages/ApiKeys";
import { ApiUsage } from "./pages/ApiUsage";
import { RequestLogs } from "./pages/RequestLogs";
import { TestBooks } from "./pages/TestBooks";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <SidebarLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="api-keys" element={<ApiKeys />} />
        <Route path="usage" element={<ApiUsage />} />
        <Route path="logs" element={<RequestLogs />} />
        <Route path="test-books" element={<TestBooks />} />
      </Route>
    </Routes>
  );
}

export default App;