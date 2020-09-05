import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Box, Grid, Paper } from "@material-ui/core";

import { deleteItem } from "./coreapicalls";
import { editItem } from "./coreapicalls";
import { useContext } from "react";
import { BudgetContext } from "../BudgetContext";

import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  mainRoot: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  root: {
    margin: "0.5rem 0rem",
    minWidth: "15%",
    width: "100%",
  },
  deleteButton: {
    backgroundColor: "#e53935",
    color: "white",
    marginRight: "1rem",
    [theme.breakpoints.down("sm")]: {
      marginRight: "0rem",
    },
  },
  editButton: {
    backgroundColor: "#1e88e5",
    color: "white",
  },
  paperStyle: {
    padding: "0.5rem",
    margin: "0.5rem",
    textAlign: "center",
    // borderRadius: "2.2rem",
  },
}));

const ItemCard = ({ id, title, description, amount, date, name }) => {
  const classes = useStyles();

  const { sUpdate } = useContext(BudgetContext);
  const [shouldUpdate, setShouldUpdate] = sUpdate;

  const formatDate = () => {
    const newDate = new Date(date).toDateString();
    return newDate;
  };

  useEffect(() => {
    formatDate();
  }, []);

  return (
    <Paper
      variant="elevation"
      elevation={2}
      square={false}
      className={clsx(classes.mainRoot, classes.paperStyle)}
      style={{ margin: "0.5rem", width: "65%" }}
    >
      <Grid container spacing={3} className={classes.root}>
        <Grid item xs={12} sm={5} className={classes.mainRoot}>
          <Box component="div">
            <Typography
              variant="body1"
              style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}
            >
              {title}
            </Typography>
            <Typography variant="subtitle2">{description}</Typography>
            <Typography variant="subtitle2" style={{ marginBottom: "0.5rem" }}>
              {formatDate()}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={5} className={classes.mainRoot}>
          <div>
            <Typography variant="body1">Amount</Typography>
            {name === "Income" ? (
              <Box component="span" style={{ color: "#43BE31" }}>
                ₹{amount}
              </Box>
            ) : (
              <Box component="span" style={{ color: "#EC4849" }}>
                ₹{amount}
              </Box>
            )}
          </div>
        </Grid>
        <Grid item xs={12} sm={2} className={classes.mainRoot}>
          <Button
            size="small"
            className={classes.deleteButton}
            onClick={() => {
              deleteItem(id);
              setShouldUpdate(!shouldUpdate);
            }}
          >
            Delete
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};
export default ItemCard;
