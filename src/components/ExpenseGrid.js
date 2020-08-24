import React from "react";
import { Grid, Typography } from "@material-ui/core";

export default function ExpenseGrid() {
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography component="h4" variant="h4">
            Expense
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
