import React, { useState, useEffect, useContext } from "react";

import ItemCard from "./ItemCard";
import TextField from "@material-ui/core/TextField";
import { Grid, Typography } from "@material-ui/core";
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
    getData().then((data) => {
      var fData = data.filter(
        (item) =>
          item.user === userId &&
          item.itemType === "income" &&
          item.date.split("-")[1] === curMonth
      );
      setIncomeData(fData);
      var fData = data.filter(
        (item) =>
          item.user === userId &&
          item.itemType === "expense" &&
          item.date.split("-")[1] === curMonth
      );
      setExpenseData(fData);
    });
    //Refreshing data from the API
  }, [shouldUpdate, curMonth]);

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography component="h4" variant="h4">
            {name}
          </Typography>
          <div>
            Total {name} : ₹{localData}
          </div>
          <br />
          <Button
            size="medium"
            className={classes.deleteButton}
            onClick={() => {
              setShowAddItem(!showAddItem);
            }}
          >
            Add Item
          </Button>
          {showAddItem ? (
            <div>
              <TextField
                id="outlined-basic"
                label="Add Item Name"
                variant="outlined"
                onChange={handleChange("title")}
              />
              <TextField
                id="outlined-basic"
                label="Add Amount"
                variant="outlined"
                onChange={handleChange("amount")}
              />
              <Button
                size="small"
                className={classes.deleteButton}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </div>
          ) : (
            ""
          )}
          <br />
          <div>
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
