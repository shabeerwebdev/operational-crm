import React, { useEffect } from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const user = localStorage.getItem("user");
  const { name } = JSON.parse(user) || "";

  const navigate = useNavigate();
  const logoutFn = () => {
    localStorage.clear();
    navigate("/");
  };

  const { userTypes } = JSON.parse(localStorage.getItem("user"));
  console.log(userTypes);

  const takeTo = () => {
    window.location.href = `${userTypes.toLowerCase()}`;
  };
  
  return (
    <div className="sticky-top">
      <nav className="navbar gap-2 navbar-dark bg-light p-3 sticky-top">
        <img
          style={{ cursor: "pointer" }}
          onClick={takeTo}
          src={logo}
          alt="Bootstrap"
          width="100"
          height="100%"
        />

        <div className="text-light ">
          <h4 style={{ color: "#4d4d4d" }}>Welcome, {name} !</h4>
        </div>

        <button
          onClick={logoutFn}
          className="btn btn-outline-danger"
          type="submit"
        >
          Logout
        </button>
      </nav>
    </div>
  );
}

export default Navbar;
