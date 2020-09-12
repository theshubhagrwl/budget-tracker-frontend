import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Box, Grid, Paper } from "@material-ui/core";

import { deleteItem } from "./coreapicalls";
import { editItem } from "./coreapicalls";
import { useContext } from "react";
import { BudgetContext } from "../BudgetContext";

import clsx from "clsx";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  mainRoot: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  root: {
    margin: "0.2rem 0rem",
    minWidth: "15%",
    width: "100%",
  },
  deleteButton: {
    backgroundColor: "#e53935",
    color: "white",
    marginRight: "1rem",
    border: "1px solid red",
    [theme.breakpoints.down("sm")]: {
      marginRight: "0rem",
    },
    "&:hover": {
      background: "white",
      color: "red",
      border: "1px solid red",
    },
  },
  editButton: {
    backgroundColor: "#1e88e5",
    color: "white",
  },
  paperStyle: {
    paddingRight: "0.5rem",
    margin: "0.5rem",
    textAlign: "center",
    // borderRadius: "2.2rem",
  },
}));

const ItemCard = ({ id, title, description, amount, date, name }) => {
  const classes = useStyles();

  const { sUpdate } = useContext(BudgetContext);
  const [shouldUpdate, setShouldUpdate] = sUpdate;
  const [loading, setLoading] = useState(false);

  const formatDate = () => {
    return moment(date).format("D MMM, YYYY");
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await deleteItem(id);
      if (response) {
        setLoading(false);
      }
      setShouldUpdate(!shouldUpdate);
    } catch (error) {
      console.log(error);
    }
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
            <Typography variant="subtitle1">{description}</Typography>
            <Typography
              variant="subtitle2"
              style={{ marginBottom: "0.5rem", fontSize: "0.8rem" }}
            >
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
            onClick={handleSubmit}
          >
            {loading ? <span>Loading....</span> : <span>Delete</span>}
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};
export default ItemCard;
