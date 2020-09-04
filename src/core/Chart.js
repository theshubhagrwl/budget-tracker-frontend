import React, { useState, useContext } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { BudgetContext } from "../BudgetContext";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  flexStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const Chart = () => {
  // var data;
  const classes = useStyles();
  const { income, expense } = useContext(BudgetContext);
  const [incomeData, setIncomeData] = income;
  const [expenseData, setExpenseData] = expense;

  var chartData1 = [];
  var chartData2 = [];
  //   chartData.month =
  //   console.log(chartData);
  //   data.map((i) => console.log(i.amount, i.date.split("-")[1]));
  incomeData.map((i) => {
    chartData1.push({
      month: `${i.date.split("-")[1]}`,
      amt: `${parseInt(i.amount)}`,
      //   amount2: `${parseInt(i.amount)}`,
    });
    // chartData.month = i.date.split("-")[1];
  });

  expenseData.map((i) => {
    chartData2.push({
      month: `${i.date.split("-")[1]}`,
      amt: `${parseInt(i.amount)}`,
      //   amount2: `${parseInt(i.amount)}`,
    });
    // chartData.month = i.date.split("-")[1];
  });
  //   console.log(chartData);

  return (
    <Grid container spacing={1} justify="center" alignContent="center">
      <Grid item xs={12} className={classes.flexStyle}>
        <AreaChart
          width={350}
          height={250}
          data={chartData1}
          margin={{
            top: 0,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="amt" stroke="#019031" fill="#45CE30" />
        </AreaChart>
      </Grid>
      <Grid item xs={12}>
        <AreaChart
          width={350}
          height={250}
          data={chartData2}
          margin={{
            top: 0,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="amt" stroke="#EEC213" fill="#FFF222" />
        </AreaChart>
      </Grid>
    </Grid>
  );
};

export default Chart;
