import React, { useState } from "react";
import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";
import { signin, authenticate, isAuthenticated } from "../auth";

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

const Signin = () => {
  const classes = useStyles();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
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
        // console.log("DATA", data);
        if (data.token) {
          authenticate(data, () => {
            // console.log("TOKEN ADDED");
            setValues({
              ...values,
              didRedirect: true,
              // success: true,
            });
          });
        } else {
          setValues({
            ...values,
            loading: false,
            error: true,
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
      // <form>
      <Box component="div" className={classes.mainDiv}>
        <Typography variant="h2" component="h2">
          Sign In
        </Typography>
        {loadingMessage()}
        {errorMessage()}

        <FormControl className={classes.formGroup}>
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
          {/* <label>Email</label>
        <input type="email" value={email} onChange={handleChange("email")} /> */}
          {/* <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={handleChange("password")}
        /> */}
          {/* <input type="submit" value="Submit" onClick={onSubmit} /> */}
          {/* </form> */}
        </FormControl>
      </Box>
    );
  };

  return (
    <Base title="Welcome to Sign In Page">
      {/* {loadingMessage()} */}
      {signinForm()}
      {/* <p>{JSON.stringify(values)}</p> */}
      {performRedirect()}
    </Base>
  );
};
export default Signin;
