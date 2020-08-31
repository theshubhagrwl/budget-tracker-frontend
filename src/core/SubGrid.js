import React, { useState, useEffect, useContext } from "react";

import ItemCard from "./ItemCard";
import TextField from "@material-ui/core/TextField";
import { Grid, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

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

  const [month, setMonth] = useState("");
  const [monthData, setMonthData] = useState([]);

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
        (item) => item.user === userId && item.itemType === "income"
      );
      setIncomeData(fData);
      var fData = data.filter(
        (item) => item.user === userId && item.itemType === "expense"
      );
      setExpenseData(fData);
    });
    //Refreshing data from the API
  }, [shouldUpdate]);

  const handleMonthSubmit = (event) => {
    // event.preventDefault();
    // setMonth(event.target.value);
    console.log(month);

    if (name === "Income") {
      var temp;
      temp = incomeData.filter((i) => i.date.split("-")[1] === month);
      data = temp;
      setMonthData(temp);
      // setIncomeData(temp)
      console.log(data);
    } else {
      var temp;
      temp = expenseData.filter((i) => i.date.split("-")[1] === month);
      data = temp;
      setMonthData(temp);
      console.log(data);
    }
  };
  var l;
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
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="month-native-simple">Month</InputLabel>
            <Select
              native
              value={month}
              onChange={(event) => setMonth(event.target.value)}
              inputProps={{
                name: "month",
                id: "month-native-simple",
              }}
            >
              <option aria-label="None" value="" />
              <option value="01">Jan</option>
              <option value="02">Feb</option>
              <option value="03">Mar</option>
              <option value="04">Apr</option>
              <option value="05">May</option>
              <option value="06">June</option>
              <option value="07">July</option>
              <option value="08">Aug</option>
              <option value="09">Sept</option>
              <option value="10">Oct</option>
              <option value="11">Nov</option>
              <option value="12">Dec</option>
            </Select>
            <Button
              size="small"
              className={classes.deleteButton}
              onClick={handleMonthSubmit}
            >
              Submit
            </Button>
          </FormControl>
          {/* <TextField
            id="monthName"
            label="month name"
            variant="outlined"
            // onChange={(e) => setMonth(e.target.value)}
            onChange={onMonthChange}
          /> */}
          <div>
            {/* {name === "Income" ? (
              <div>
                {(l = incomeData.filter((i) => i.date.split("-")[1] === month))}
              </div>
            ) : (
              <div></div>
            )} */}
            {monthData.length > 0
              ? monthData.map((i) => {
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
                })
              : data.map((i) => {
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
            {/* {data.map((i) => {
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
            })} */}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
export default SubGrid;
