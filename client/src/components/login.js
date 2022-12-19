import React, { useContext, useRef } from "react";
import { Context } from "../context/Context";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = (props) => {
  const { user } = useContext(Context);
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);
  const nav = useNavigate();
  
  const loginhandleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      props.showAlert("Login successfully", "success");
      nav("/");
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE" });
      props.showAlert(error.response.data.error, "danger");
    }
  };

  return (
    !user ? (
      <div style={{ padding: "50px 0px", backgroundColor: "#eee" }}>
        <div className="container register-form">
          <div className="form">
            <div className="note">
              <h1 className="mb-4">Login</h1>
            </div>

            <form
              className="form-content"
              method="post"
              onSubmit={loginhandleSubmit}
            >
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <input
                      type="text"
                      name="username"
                      className="form-control"
                      placeholder="Username *"
                      required
                      ref={userRef}
                    />
                  </div>
                  <div className="form-group mb-3">
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Password *"
                      autoComplete="true"
                      required
                      ref={passwordRef}
                    />
                  </div>
                </div>
                <div className="col-md-6"></div>
              </div>
              <button
                type="submit"
                className="loginbtn btn btn-primary"
                disabled={isFetching}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    ) : (
      <div style={{ padding: "50px 0px", backgroundColor: "#eee" }}>
        <div className="container register-form">
            <div className="form text-center">
                <div className="note">
                <h1 className="mb-4">You are already Logged in, { user.others.username}</h1>
                <Link className="btn btn-primary" to="/"> Back to Home</Link>
                </div>
            </div>
        </div>
      </div>
    )
   
  )
};

export default Login;
