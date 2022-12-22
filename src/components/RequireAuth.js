import React, { useEffect } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";

function RequireAuth({ allowedRoles }) {
  const location = useLocation();

  // console.log(null);

  const { userTypes } = JSON.parse(localStorage.getItem("user")) || {};

  console.log(window.history);

  !userTypes && window.location.assign("/");

  return (
    // getItem("property name") === first value in the array
    userTypes === allowedRoles[0] ? (
      // placeholder to return the specific route
      <Outlet />
    ) : // false condition with usertype present but not matching the allowedRoles value
    userTypes ? (
      // navigate the user to unauthorized page
      <Navigate to="/unauthorized" state={{ from: location }} replace />
    ) : (
      // if usertype is not present in local storage, user needs to logi again properly
      <Navigate to="/" state={{ from: location }} replace />
    )
  );
  // ? true : false ? true : false
}

export default RequireAuth;

{
  /* <Navigate to="/unauthorized" state={{ from: location }} replace />
admin -> engineer -> unauth
from : admin -> engineer : replaced unauth */
}
