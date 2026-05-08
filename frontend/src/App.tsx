import { Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Dashboard } from "./pages/Dashboard";
import { SidebarLayout} from "./layouts/SidebarLayout";
import { ApiKeys} from "./pages/ApiKeys";
import ApiUsage from "./pages/ApiUsage";


function App() {
  return (
    <>
<Routes>
  <Route path="/" element={<Login />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />

  <Route path="/" element={<SidebarLayout />}>
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="api-keys" element={<ApiKeys />} />
    <Route path="usage" element={<ApiUsage />} />
  </Route>
</Routes>
    </>
  );
}

export default App;