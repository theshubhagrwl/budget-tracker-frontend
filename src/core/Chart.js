import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

// import { BudgetContext } from "../BudgetContext";
import { Grid, Typography, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  flexStyle: {
    display: "flex",
    justifyContent: "center",
    // alignItems: "center",
    marginTop: "2rem",
    marginBottom: "4rem",
    // alignItems: "center",
  },
  customTooltip: {
    display: "flex",
    backgroundColor: "whitesmoke",
    justifyContent: "center",
    alignItems: "center",
    padding: "1rem",
  },
}));

function CustomTooltip({ payload, label, active }) {
  const classes = useStyles();
  if (active) {
    return (
      <div className={classes.customTooltip}>
        {/* <p className="desc"></p> */}
        {payload ? (
          <p className="label">{`₹ ${payload[0].value} in Month: ${label}`}</p>
        ) : (
          ""
        )}
      </div>
    );
  }

  return null;
}

const Chart = ({ data, fill, stroke, name }) => {
  const classes = useStyles();

  var chartData1 = [];
  //   chartData.month =
  //   console.log(chartData);
  //   data.map((i) => console.log(i.amount, i.date.split("-")[1]));
  data.map((i) => {
    chartData1.push({
      month: `${i.date.split("-")[1]}`,
      amt: `${parseInt(i.amount)}`,
    });
  });

  return (
    <Box component="div">
      <Typography variant="h6" component="h6" className={classes.flexStyle}>
        {name}
      </Typography>
      <div className={classes.flexStyle}>
        <br />
        <AreaChart
          width={300}
          height={200}
          data={chartData1}
          margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="amt"
            stroke={stroke}
            fill={fill}
            fillOpacity={0.2}
          />
        </AreaChart>
      </div>
    </Box>
  );
};

export default Chart;
