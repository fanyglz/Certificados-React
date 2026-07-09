import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Admin from "../pages/Admin";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/admin" element={<Admin />} />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;