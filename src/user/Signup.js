import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { signup } from "../auth/index";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, email, password, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password })
      .then((data) => {
        console.log(data);
        if (data.email === email) {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        } else {
          setValues({ ...values, error: true, success: false });
        }
      })
      .catch((e) => console.log(e));
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

  const signupForm = () => {
    return (
      <form>
        <label>Name</label>
        <input type="text" value={name} onChange={handleChange("name")} />
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
    <Base title="Sign Up Page">
      {successMessage()}
      {errorMessage()}
      {signupForm()}
      <p>{JSON.stringify(values)}</p>
    </Base>
  );
};
export default Signup;
