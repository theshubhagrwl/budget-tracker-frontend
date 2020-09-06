import React from "react";
import Base from "./Base";
import { Typography, Box, Button, ButtonGroup } from "@material-ui/core";
import { Link } from "react-router-dom";
// import "../styles.css";
import { makeStyles } from "@material-ui/core/styles";
import { isAuthenticated } from "../auth";

const useStyles = makeStyles((theme) => ({
  detail: {
    fontWeight: 300,
    fontSize: "1.5rem",
    margin: "1rem",
  },
  actionButton: theme.blackButton,
  greenButton: theme.greenButton,
  mainDiv: theme.flexDiv,
}));

const WelcomePage = () => {
  const classes = useStyles();
  return (
    <Base title="Welcome">
      <Box component="div" className={classes.mainDiv}>
        <Typography variant="h2" component="h2">
          Welcome to Budget Tracker
        </Typography>
        <Box component="div">
          <Typography variant="h5" component="h5" className={classes.detail}>
            Hi, Welcome to the Budget Tracker App{" "}
            <span role="img" aria-label="smilie">
              😃
            </span>
            <br /> Glad to see you here. <br />
            This app will help you keep track of your daily budget. <br />
          </Typography>
          <Typography variant="h6" component="h6" style={{ margin: "1rem" }}>
            LETS GET STARTED
          </Typography>
          <ButtonGroup orientation="vertical" variant="text">
            <Link to="/signin" style={{ textDecoration: "none" }}>
              <Button
                className={classes.greenButton}
                style={{ marginBottom: "1rem" }}
              >
                Login
              </Button>
            </Link>
            <Link to="/signup" style={{ textDecoration: "none" }}>
              <Button className={classes.actionButton}>Register</Button>
            </Link>
          </ButtonGroup>
          {isAuthenticated() ? (
            <Box component="div">
              <Typography
                variant="h6"
                component="h6"
                style={{ margin: "1rem" }}
              >
                GO TO DASHBOARD
              </Typography>
              <Link to="/user/dashboard" style={{ textDecoration: "none" }}>
                <Button className={classes.greenButton}>DASHBOARD</Button>
              </Link>
            </Box>
          ) : (
            ""
          )}
        </Box>
      </Box>
    </Base>
  );
};
export default WelcomePage;
