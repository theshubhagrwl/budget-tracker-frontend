import React from "react";
import Typography from "@material-ui/core/Typography";
import Menu from "./Menu";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  headingStyle: {
    padding: "1rem",
    fontWeight: 400,
  },
});

const Base = ({
  title = "My Title",
  //   description = "My Description",
  //   className = "bg-dark text-white p-4",
  children,
}) => {
  const classes = useStyles();
  return (
    <div>
      <Menu />
      <Typography variant="h2" component="h2" className={classes.headingStyle}>
        {title}
      </Typography>
      {children}
      {/* <div className="container-fluid">
        <div className="jumbotron bg-dark text-white text-center">
          <h2 className="display-4">{title}</h2>
          <p className="lead">{description}</p>
        </div>
        <div className={className}> {children} </div>
      </div>
      <footer className="footer bg-dark mt-auto py-3">
        <div className="container-fluid bg-success text-white text-center py-3">
          <h4>Reach me out for questions</h4>
          <button className="btn btn-warning btn-lg">Contact us</button>
          <div className="container">
            <span className="text-warning">An Amazing Django+React Store</span>
          </div>
        </div>
      </footer> */}
    </div>
  );
};
export default Base;
