import React from "react";
import {
  Routes,
  Route,
  Navigate,
  Outlet
} from "react-router-dom";

import { jwtDecode } from "jwt-decode";

import Dashboard from "./pages/Dashboard";
import AdDashboard from "./pages/AdDashboard";
import Login from "./pages/login";
import Company_portal from "./pages/Company_portal";
import SetPassword from "./pages/SetPassword";

import "./App.css";
import "./pages/i18n";

function RedirectIfLoggedIn() {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Login />;
  }

  try {
    const decoded = jwtDecode(token);

    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");

      return <Login />;
    }

    switch (decoded.role) {
      case "superadmin":
        return <Navigate to="/sp-Dashboard" replace />;

      case "subadmin":
        return <Navigate to="/sb-Dashboard" replace />;

      case "cashier":
        return <Navigate to="/Client-managent" replace />;

      default:
        localStorage.removeItem("token");

        return <Login />;
    }
  } catch {
    localStorage.removeItem("token");

    return <Login />;
  }
}


function ProtectedRoutes({ allowedRole }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  try {
    const decoded = jwtDecode(token);

    const role = decoded.role;


    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");

      return <Navigate to="/" replace />;
    }

    if (!allowedRole.includes(role)) {
      switch (role) {
        case "superadmin":
          return <Navigate to="/sp-Dashboard" replace />;

        case "subadmin":
          return <Navigate to="/sb-Dashboard" replace />;

        case "cashier":
          return <Navigate to="/Client-managent" replace />;

        default:
          localStorage.removeItem("token");

          return <Navigate to="/" replace />;
      }
    }

    return <Outlet />;

  } catch (err) {
    console.log(err);

    localStorage.removeItem("token");

    return <Navigate to="/" replace />;
  }
}



function App() {
  return (
    <Routes>

      <Route path="/" element={<RedirectIfLoggedIn/>}/>

      <Route element={<ProtectedRoutes  allowedRole={["superadmin"]} />}>
        <Route path="/sp-Dashboard" element={<Dashboard />}/>
      </Route>

      <Route element={ <ProtectedRoutes allowedRole={["subadmin"]} /> }>
        <Route path="/sb-Dashboard" element={<AdDashboard />}/>
      </Route>
      <Route path="/company-reg-portal" element={<Company_portal />} />

      <Route  path="/security-setting/:tkn" element={<SetPassword />}/>

      <Route path="*"  element={<Navigate to="/" replace />}
      />

    </Routes>
  );
}

export default App;