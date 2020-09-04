import React, { useState, useEffect, useContext } from "react";

import ItemCard from "./ItemCard";
import TextField from "@material-ui/core/TextField";
import {
  Grid,
  Typography,
  FormControl,
  Box,
  InputAdornment,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import { isAuthenticated } from "../auth";
import { addItem, getData } from "./coreapicalls";
import { BudgetContext } from "../BudgetContext";

const useStyles = makeStyles((theme) => ({
  deleteButton: {
    backgroundColor: "#e53935",
    color: "white",
  },
  addItemButton: {
    backgroundColor: "#212121",
    color: "#fff",
  },
  submitButton: {
    backgroundColor: "#00c853",
    color: "white",
  },
  textFieldStyle: {
    margin: theme.spacing(1),
    width: "25ch",
    marginBottom: "1rem",
  },
  cardFlexStyle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const SubGrid = ({ name }) => {
  var data;
  const classes = useStyles();
  const userId = isAuthenticated() && isAuthenticated().user.id;

  const { income, expense, sUpdate } = useContext(BudgetContext);
  const [incomeData, setIncomeData] = income;
  const [expenseData, setExpenseData] = expense;

  //To check whether you have to recall the API
  const [shouldUpdate, setShouldUpdate] = sUpdate;

  const [localData, setLocalData] = useState(0);
  const [showAddItem, setShowAddItem] = useState(false);
  const [newItemData, setNewItemData] = useState({
    title: "",
    description: "",
    amount: "",
    itemType: name.toLowerCase(),
    user: userId,
  });

  const { month } = useContext(BudgetContext);
  const [curMonth, setCurMonth] = month;

  if (name === "Income") {
    data = incomeData;
  } else {
    data = expenseData;
  }

  const handleChange = (name) => (event) => {
    setNewItemData({
      ...newItemData,
      [name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setNewItemData({ ...newItemData });
    setShowAddItem(false);
    addItem(newItemData);
    setShouldUpdate(!shouldUpdate);
  };

  // //Calc the sum of income and expense
  const getlocalData = () => {
    let temp = 0;
    data.map((i) => {
      temp = temp + i.amount;
    });
    setLocalData(temp);
  };

  useEffect(() => {
    getlocalData();
    //recalling the API
  }, [data]);

  useEffect(() => {
    if (curMonth !== "all") {
      getData().then((data) => {
        var fData = data.filter(
          (item) =>
            item.user === userId &&
            item.itemType === "income" &&
            item.date.split("-")[1] === curMonth
        );
        setIncomeData(fData.reverse());
        var fData = data.filter(
          (item) =>
            item.user === userId &&
            item.itemType === "expense" &&
            item.date.split("-")[1] === curMonth
        );
        setExpenseData(fData.reverse());
      });
    } else {
      getData().then((data) => {
        var fData;
        fData = data.filter(
          (item) => item.user === userId && item.itemType === "income"
        );
        setIncomeData(fData.reverse());
        fData = data.filter(
          (item) => item.user === userId && item.itemType === "expense"
        );
        setExpenseData(fData.reverse());
      });
    }
    //Refreshing data from the API
  }, [shouldUpdate, curMonth]);

  return (
    <div>
      <Grid container spacing={3} justify="center" alignItems="center">
        <Grid item xs={12}>
          <Typography component="h4" variant="h4">
            {name}
          </Typography>
          <div>
            <Typography component="subtitle2">Total : ₹{localData}</Typography>
          </div>
          <br />
          <Button
            size="medium"
            className={classes.addItemButton}
            onClick={() => {
              setShowAddItem(!showAddItem);
            }}
          >
            Add Item
          </Button>
          <br />
          {showAddItem ? (
            <Box style={{ marginBottom: "1rem" }}>
              <FormControl>
                <TextField
                  required
                  id="name"
                  label="Enter Name"
                  className={classes.textFieldStyle}
                  onChange={handleChange("title")}
                />
                <TextField
                  required
                  id="amount"
                  label="Amount"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  className={classes.textFieldStyle}
                  onChange={handleChange("amount")}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">₹</InputAdornment>
                    ),
                  }}
                />
                <Button
                  size="small"
                  className={classes.submitButton}
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </FormControl>
            </Box>
          ) : (
            ""
          )}
          <br />
          <div className={classes.cardFlexStyle}>
            {data.map((i) => {
              return (
                <ItemCard
                  key={i.id}
                  id={i.id}
                  title={i.title}
                  description={i.description}
                  amount={i.amount}
                  date={i.date}
                />
              );
            })}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
export default SubGrid;
