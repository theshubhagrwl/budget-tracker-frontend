import React from "react";
import { Grid } from "@material-ui/core";
import IncomeGrid from "./IncomeGrid";
import ExpenseGrid from "./ExpenseGrid";

export default function MainGrid() {
  return (
    <div>
      <Grid container spacing={3} justify="center" alignContent="center">
        <Grid item xs={6}>
          <IncomeGrid />
        </Grid>
        <Grid item xs={6}>
          <ExpenseGrid />
        </Grid>
      </Grid>
    </div>
  );
}
