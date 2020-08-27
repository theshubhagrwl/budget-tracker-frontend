import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import ItemCard from "./ItemCard";

const ExpenseGrid = ({ expenseData }) => {
  const [totalExpense, setTotalExpense] = useState(0);
  console.log("Expense Data", expenseData);

  var temp = totalExpense;
  const getTotalExpense = () => {
    expenseData.map((i) => {
      temp = temp + i.amount;
    });
    setTotalExpense(temp);
  };

  useEffect(() => {
    getTotalExpense();
  }, [expenseData]);

  if (totalExpense > 0) {
    console.log("expense", totalExpense);
  }

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography component="h4" variant="h4">
            Expense
          </Typography>
          <div>
            {expenseData.map((i) => {
              return (
                <ItemCard
                  key={i.id}
                  title={i.title}
                  description={i.description}
                  amount={i.amount}
                />
              );
            })}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
export default ExpenseGrid;
