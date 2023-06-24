import React, { useState } from "react";
import { login } from "./UserFunctions";

const Login = ({ history }) => {
  const [state, setState] = useState({
    email: "",
    password: "",
    errors: {},
  });

  const { email, password, errors } = state;

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    login(user).then((res) => {
      if (res) {
        history.push(`/profile`);
      }
    });
  };

  return (
    <div className="container">
      <div className="customLogin ">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={onSubmit}>
              <h1 className="text-center headerMain ">
                <span className="headerMid">Sign </span> In
              </h1>

              <div className="form-group">
                <label htmlFor="email">
                  Email address<sup style={{ color: "red" }}>*</sup>
                </label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">
                  Password<sup style={{ color: "red" }}>*</sup>
                </label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={onChange}
                />
              </div>
              <button
                type="submit"
                id="customSignIn"
                className="btn btn-lg  btn-block"
              >
                Sign in
              </button>
              <button
                type="submit"
                id="customForgotPass"
                className="btn btn-lg  btn-block"
              >
                Forgot Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
