import React from "react";
import Base from "./Base";
import { Typography, Box, Button, ButtonGroup } from "@material-ui/core";
// import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Link } from "react-router-dom";

import "../styles.css";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  detail: {
    fontWeight: 300,
    fontSize: "1.5rem",
    margin: "1rem",
  },
  actionButton: {
    backgroundColor: "#212121",
    margin: "1rem",
    color: "white",
  },
  mainDiv: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    flexDirection: "column",
  },
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
            Hi, Welcome to the Budget Tracker App <span>😃</span> <br /> Glad to
            see you here. <br />
            This app will help you keep track of you budget. <br />
            <Typography variant="h6" component="h6" style={{ margin: "1rem" }}>
              LETS GET STARTED
            </Typography>
            {/* <Box component="div" className={classes.buttonGroup}> */}
            <ButtonGroup orientation="vertical" variant="text">
              <Link to="/signin" style={{ textDecoration: "none" }}>
                <Button color="secondary" className={classes.actionButton}>
                  Login
                </Button>
              </Link>
              <Link to="/signup" style={{ textDecoration: "none" }}>
                <Button className={classes.actionButton}>Register</Button>
              </Link>
            </ButtonGroup>
          </Typography>
        </Box>
      </Box>
    </Base>
  );
};
export default WelcomePage;
