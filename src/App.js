import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import Customer from "./pages/Customer";
import Engineer from "./pages/Engineer";
import Unauth from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";
import "./styles.css";
import Navbar from "./components/Navbar";

function App() {
  const ROLES = {
    CUSTOMER: "CUSTOMER",
    ADMIN: "ADMIN",
    ENGINEER: "ENGINEER",
  };

  // const user = {
  //   name: "",
  //   userId: "",
  //   email: "",
  //   userTypes: "",
  //   userStatus: "",
  // };

  // React.useEffect(() => {
  //   localStorage.setItem("user", JSON.stringify(user));
  // });
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Auth />} />
        {/* Protected routes by require auth starts */}
        <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
          <Route path="/admin" element={<Admin />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[ROLES.ENGINEER]} />}>
          <Route path="/engineer" element={<Engineer />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[ROLES.CUSTOMER]} />}>
          <Route path="/customer" element={<Customer />} />
        </Route>
        {/* Protected routes by require auth end */}
        <Route path="/*" element={<NotFound />} />
        <Route path="/unauthorized" element={<Unauth />} />
      </Routes>
    </div>
  );
}

export default App;
