import React, { useState } from "react";
import logo from "../assets/logo.png";
import { userSignup, userSignin } from "../api/auth";
import { useNavigate } from "react-router-dom";

function Auth() {
  const navigate = useNavigate();

  const [signup, setSignup] = useState(false);
  const [message, setMessage] = useState({
    success: "",
    failure: "",
  });

  const [auth, setAuth] = useState({
    userId: "",
    name: "",
    password: "",
    email: "",
    userTypes: "CUSTOMER",
  });

  const updateSignupData = (e) => {
    setAuth((prev) => {
      return {
        ...auth,
        [e.target.name]: e.target.value,
      };
    });
  };

  const [load, setLoad] = useState(false);

  const signupFn = (e) => {
    e.preventDefault();
    setLoad(true);
    userSignup(auth)
      .then(function(response) {
        if (response.status === 201) {
          setLoad(false);
          setSignup(false);
          setMessage({ success: "User Signed Up Successfully!" });
        }
      })
      .catch(function(error) {
        setLoad(false);
        setMessage({ failure: error.response.data.message });
      });
  };
  const loginFn = (e) => {
    e.preventDefault();
    setLoad(true);
    userSignin(auth)
      .then((response) => {
        // setItem(name, value)
        setLoad(false);
        localStorage.setItem("user", JSON.stringify(response.data));
        if (response.data.userTypes === "CUSTOMER") navigate("/customer");
        else if (response.data.userTypes === "ENGINEER") navigate("/engineer");
        else if (response.data.userTypes === "ADMIN") navigate("/admin");
        else navigate("/");
      })
      .catch((error) => {
        setLoad(false);
        console.log(error.response.data.message, "here");
        setMessage({ failure: error.response.data.message });
      });
  };

  return (
    <div
      className="d-flex gradient-background"
      style={{
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={signup ? signupFn : loginFn}
        style={{ maxWidth: "400px" }}
        className={`container d-flex flex-column border border-light px-4 py-3 rounded bg-light m-2 ${message.failure &&
          "shake"} ${message.success && "pulse"}`}
      >
        <div className="d-flex row justify-content-evenly align-items-center">
          <img style={{ width: "8rem" }} className="m-2" src={logo} alt="" />
        </div>

        <div
          className={`${
            message.success ? "text-success" : "text-danger"
          } text-center m-4 mt-2`}
        >
          {message.failure || message.success}
        </div>

        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control input-lg"
            id="floatingInput"
            name="userId"
            placeholder="User Id"
            value={auth.userId}
            onChange={updateSignupData}
            autoFocus
            required
          />
          <label htmlFor="floatingInput">UserId</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            name="password"
            placeholder="Password"
            value={auth.password}
            onChange={updateSignupData}
            required
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>

        {signup && (
          <div>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                id="floatingEmail"
                name="email"
                value={auth.email}
                onChange={updateSignupData}
                required
              />
              <label htmlFor="floatingEmail">Email</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingUsername"
                name="name"
                placeholder="User Name"
                value={auth.name}
                onChange={updateSignupData}
                required
              />
              <label htmlFor="floatingUsername">User Name</label>
            </div>

            <div className="d-flex mb-3 align-items-center justify-content-between">
              <div className="flex-grow-1">Select user type:</div>
              <div>
                <select
                  name="userType"
                  value={auth.userTypes}
                  onChange={updateSignupData}
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option className="m-4" value="CUSTOMER">
                    CUSTOMER
                  </option>
                  <option className="m-4" value="ENGINEER">
                    ENGINEER
                  </option>
                </select>
              </div>
            </div>
          </div>
        )}
        <button
          style={{ backgroundColor: "#01a6e6" }}
          className="btn p-2 mb-3 text-light"
        >
          {/* {!load && signup ? "Sign up" : "Sign in"} */}

          {load ? (
            <div
              style={{ height: "1.5rem", width: "1.5rem" }}
              className="spinner-border"
              role="status"
            ></div>
          ) : signup ? (
            "Sign up"
          ) : (
            "Sign in"
          )}
        </button>
        <div
          style={{ cursor: "pointer" }}
          className="alert alert-light p-2 text-center"
          role="alert"
          onClick={() => setSignup((prev) => !prev)}
        >
          {signup ? "Already have an account ?" : "Create new account !"}
        </div>
      </form>
    </div>
  );
}

export default Auth;
