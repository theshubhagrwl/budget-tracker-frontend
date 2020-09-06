import React from "react";
import { Box, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { isAuthenticated } from "../auth";
import { useHistory, Link } from "react-router-dom";
import { signout } from "../auth";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    textAlign: "left",
    fontSize: "1.3rem",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1rem",
    },
  },
  rightButton: {
    fontSize: "1rem",
    color: "#00c853",
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.7rem",
    },
  },
}));

export default function Navbar() {
  const classes = useStyles();
  let history = useHistory();
  return (
    <Box
      display="flex"
      bgcolor="black"
      color="white"
      p={1}
      alignItems="center"
      className={classes.root}
    >
      <Typography variant="h4" className={classes.title}>
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
          Home
        </Link>
      </Typography>
      <Box flexGrow={1} flexShrink={0} textAlign="right">
        {isAuthenticated() ? (
          <Button
            color="secondary"
            className={classes.rightButton}
            onClick={() => {
              signout(() => {
                history.push("/");
              });
            }}
          >
            Logout
          </Button>
        ) : (
          <div>
            <Link to="/signin" style={{ textDecoration: "none" }}>
              <Button className={classes.rightButton}>Login</Button>
            </Link>
            <Link to="/signup" style={{ textDecoration: "none" }}>
              <Button color="secondary" className={classes.rightButton}>
                Register
              </Button>
            </Link>
          </div>
        )}
      </Box>
    </Box>
  );
}
