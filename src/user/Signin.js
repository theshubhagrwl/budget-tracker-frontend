import React, { useState } from "react";
import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";
import { signin, authenticate, isAuthenticated } from "../auth";

const Signin = () => {
  const [values, setValues] = useState({
    name: "",
    email: "shubh@g.com",
    password: "shubh",
    error: "",
    success: false,
    loading: false,
    didRedirect: false,
  });

  const {
    name,
    email,
    password,
    error,
    success,
    loading,
    didRedirect,
  } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });

    signin({ email, password })
      .then((data) => {
        console.log("DATA", data);
        if (data.token) {
          authenticate(data, () => {
            console.log("TOKEN ADDED");
            setValues({
              ...values,
              didRedirect: true,
            });
          });
        } else {
          setValues({
            ...values,
            loading: false,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const performRedirect = () => {
    if (isAuthenticated()) {
      return <Redirect to="/user/dashboard/" />;
    }
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div>
          <h2>Loading....</h2>
        </div>
      )
    );
  };

  const successMessage = () => {
    return (
      <div style={{ display: success ? "" : "none" }}>
        <p>
          New Account Created. Please <Link to="/signin"> Login </Link>{" "}
        </p>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div style={{ display: error ? "" : "none" }}>
        <p>Check all fields again.</p>
      </div>
    );
  };

  const signinForm = () => {
    return (
      <form>
        <label>Email</label>
        <input type="email" value={email} onChange={handleChange("email")} />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={handleChange("password")}
        />
        <input type="submit" value="Submit" onClick={onSubmit} />
      </form>
    );
  };

  return (
    <Base title="Welcome to Sign In Page">
      {loadingMessage()}
      {signinForm()}
      <p>{JSON.stringify(values)}</p>
      {performRedirect()}
    </Base>
  );
};
export default Signin;
