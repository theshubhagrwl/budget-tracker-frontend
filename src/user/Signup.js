import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { signup } from "../auth/index";

import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Button,
  FormControl,
  TextField,
  Box,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  mainDiv: theme.flexDiv,
  formGroup: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  textFields: {
    width: "20%",
    margin: "1rem",
    [theme.breakpoints.down("sm")]: {
      width: "50%",
    },
  },
  submitButton: {
    backgroundColor: "#00c853",
    color: "white",
    width: "20%",
    "&:hover": {
      background: "#00e676",
    },
    [theme.breakpoints.down("sm")]: {
      width: "50%",
    },
  },
}));

const Signup = () => {
  const classes = useStyles();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
    loading: false,
  });

  const { name, email, password, error, success, loading } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
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
            loading: false,
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
        <div
          style={{
            color: "#43a047",
          }}
        >
          New Account Created. Please{" "}
          <Link
            to="/signin"
            style={{
              color: "#00e676",
            }}
          >
            {" "}
            Login{" "}
          </Link>{" "}
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div style={{ display: error ? "" : "none" }}>
        <div
          style={{
            color: "#e53935",
          }}
        >
          Check all fields again.
        </div>
      </div>
    );
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

  const signupForm = () => {
    return (
      <Box component="div" className={classes.mainDiv}>
        <Typography variant="h2" componen="h2">
          Sign Up
        </Typography>
        {loadingMessage()}
        {errorMessage()}
        {successMessage()}
        <FormControl className={classes.formGroup}>
          <TextField
            required
            type="text"
            label="Name"
            value={name}
            className={classes.textFields}
            onChange={handleChange("name")}
          />
          <TextField
            required
            type="email"
            label="Email"
            value={email}
            className={classes.textFields}
            onChange={handleChange("email")}
          />
          <TextField
            required
            type="password"
            label="Password"
            value={password}
            className={classes.textFields}
            onChange={handleChange("password")}
          />
          <Button className={classes.submitButton} onClick={onSubmit}>
            Submit
          </Button>
        </FormControl>
      </Box>
      // <form>
      //   <label>Name</label>
      //   <input type="text" value={name} onChange={handleChange("name")} />
      //   <label>Email</label>
      //   <input type="email" value={email} onChange={handleChange("email")} />
      //   <label>Password</label>
      //   <input
      //     type="password"
      //     value={password}
      //     onChange={handleChange("password")}
      //   />
      //   <input type="submit" value="Submit" onClick={onSubmit} />
      // </form>
    );
  };

  return (
    <Base title="Sign Up Page">
      {/* {successMessage()} */}
      {/* {errorMessage()} */}
      {signupForm()}
      {/* <p>{JSON.stringify(values)}</p> */}
    </Base>
  );
};
export default Signup;
