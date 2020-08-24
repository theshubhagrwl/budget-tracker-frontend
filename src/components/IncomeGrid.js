import React from "react";
import { Grid, Typography } from "@material-ui/core";

export default function IncomeGrid() {
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography component="h4" variant="h4">
            Income
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
