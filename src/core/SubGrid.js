import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import ItemCard from "./ItemCard";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { isAuthenticated } from "../auth";
import { addItem } from "./coreapicalls";

const useStyles = makeStyles((theme) => ({
  deleteButton: {
    backgroundColor: "#e53935",
    color: "white",
  },
}));

const SubGrid = ({ data, name }) => {
  const classes = useStyles();
  const userId = isAuthenticated() && isAuthenticated().user.id;

  const [localData, setLocalData] = useState(0);
  const [showAddItem, setShowAddItem] = useState(false);
  const [newItemData, setNewItemData] = useState({
    title: "",
    description: "",
    amount: "",
    itemType: name.toLowerCase(),
    user: userId,
  });

  const handleChange = (name) => (event) => {
    setNewItemData({
      ...newItemData,
      [name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setNewItemData({ ...newItemData });
    addItem(newItemData);
  };

  // //Calc the sum of income and expense
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

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography component="h4" variant="h4">
            {name}
          </Typography>
          <div>
            Total {name} : ₹{localData}
          </div>
          <br />
          <Button
            size="medium"
            className={classes.deleteButton}
            onClick={() => {
              setShowAddItem(!showAddItem);
            }}
          >
            Add Item
          </Button>
          {showAddItem ? (
            <div>
              <TextField
                id="outlined-basic"
                label="Add Item Name"
                variant="outlined"
                onChange={handleChange("title")}
              />
              <TextField
                id="outlined-basic"
                label="Add Amount"
                variant="outlined"
                onChange={handleChange("amount")}
              />
              <Button
                size="small"
                className={classes.deleteButton}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </div>
          ) : (
            ""
          )}
          {/* <div>{JSON.stringify(newItemData)}</div> */}
          <div>
            {data.map((i) => {
              return (
                <ItemCard
                  key={i.id}
                  id={i.id}
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
