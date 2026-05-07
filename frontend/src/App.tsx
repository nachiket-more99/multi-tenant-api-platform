import { Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Dashboard } from "./pages/Dashboard";
import { SidebarLayout} from "./layouts/SidebarLayout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<SidebarLayout />}>
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;