import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import ItemCard from "./ItemCard";

const IncomeGrid = ({ incomeData }) => {
  const [totalIncome, setTotalIncome] = useState(0);

  var temp = totalIncome;
  const getTotalIncome = () => {
    incomeData.map((i) => {
      temp += i.amount;
    });
    setTotalIncome(temp);
  };

  useEffect(() => {
    getTotalIncome();
  }, [incomeData]);

  if (totalIncome > 0) {
    console.log("income", totalIncome);
  }
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography component="h4" variant="h4">
            Income
          </Typography>
          <div>
            {incomeData.map((i) => {
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

export default IncomeGrid;
