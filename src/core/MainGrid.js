import React, { useState, useEffect, useContext } from "react";
import { Grid } from "@material-ui/core";
import { isAuthenticated } from "../auth";
import { getData } from "./coreapicalls";
import SubGrid from "./SubGrid";
import { BudgetContext } from "../BudgetContext";

const MainGrid = () => {
  // const [incomeData, setIncomeData] = useState([]);
  // const [expenseData, setExpenseData] = useState([]);

  // const userId = isAuthenticated() && isAuthenticated().user.id;
  // // console.log("USERID", userId);

  // const loadData = () => {
  //   getData().then((data) => {
  //     //getting and setting the data
  //     if (data) {
  //       var fData = data.filter(
  //         (item) => item.user === userId && item.itemType === "income"
  //       );
  //       setIncomeData(fData);
  //       // console.log("INCOME DATA", fData);
  //       fData = data.filter(
  //         (item) => item.user === userId && item.itemType === "expense"
  //       );
  //       setExpenseData(fData);
  //       // console.log("Expense DATA", fData);
  //     }
  //   });
  //   // .catch((err) => console.log("ERR", err));
  // };

  // useEffect(() => {
  //   // loadData();
  // }, []);
  // console.log(incomeData);

  const value = useContext(BudgetContext);
  // console.log(value.income[0]);
  // console.log(value.expense);

  return (
    <div>
      {/* {value.map((i) => {
        return <div>{i}</div>;
      })} */}
      <Grid container spacing={3} justify="center" alignContent="center">
        <Grid item xs={6}>
          <SubGrid data={value.income[0]} name="Income" />
        </Grid>
        <Grid item xs={6}>
          <SubGrid data={value.expense[0]} name="Expense" />
        </Grid>
      </Grid>
    </div>
  );
};

export default MainGrid;
