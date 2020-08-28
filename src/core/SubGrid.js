import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import ItemCard from "./ItemCard";

const SubGrid = ({ data, name }) => {
  const [localData, setLocalData] = useState(0);
  //   console.log("Expense Data", data);

  var temp = localData;
  const getlocalData = () => {
    data.map((i) => {
      temp = temp + i.amount;
    });
    setLocalData(temp);
  };

  useEffect(() => {
    getlocalData();
  }, [data]);

  if (localData > 0) {
    console.log("expense", localData);
  }

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography component="h4" variant="h4">
            {name}
          </Typography>
          <div>Total Expense : ₹{localData}</div>
          <div>
            {data.map((i) => {
              return (
                <ItemCard
                  key={i.id}
                  title={i.title}
                  description={i.description}
                  amount={i.amount}
                  date={i.date}
                />
              );
            })}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
export default SubGrid;
