import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import IncomeGrid from "./IncomeGrid";
import ExpenseGrid from "./ExpenseGrid";
import { isAuthenticated } from "../auth";
import { getRoutes } from "./coreapicalls";

const MainGrid = () => {
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);

  const userId = isAuthenticated() && isAuthenticated().user.id;
  // console.log("USERID", userId);

  const loadAllRoutes = () => {
    getRoutes().then((data) => {
      //getting and setting the data
      if (data) {
        var fData = data.filter(
          (item) => item.user === userId && item.itemType === "income"
        );
        setIncomeData(fData);
        // console.log("INCOME DATA", fData);
        fData = data.filter(
          (item) => item.user === userId && item.itemType === "expense"
        );
        setExpenseData(fData);
        // console.log("Expense DATA", fData);
      }
    });
    // .catch((err) => console.log("ERR", err));
  };

  useEffect(() => {
    loadAllRoutes();
  }, []);

  return (
    <div>
      <Grid container spacing={3} justify="center" alignContent="center">
        <Grid item xs={6}>
          <IncomeGrid incomeData={incomeData} />
        </Grid>
        <Grid item xs={6}>
          <ExpenseGrid expenseData={expenseData} />
        </Grid>
      </Grid>
    </div>
  );
};

export default MainGrid;
