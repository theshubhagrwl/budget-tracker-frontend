import React, { useContext } from "react";
import { Grid } from "@material-ui/core";
import SubGrid from "./SubGrid";
import { BudgetContext } from "../BudgetContext";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  deleteButton: {
    backgroundColor: "#e53935",
    color: "white",
  },
}));

const MainGrid = () => {
  const classes = useStyles();
  const { month } = useContext(BudgetContext);
  const [curMonth, setCurMonth] = month;

  const handleMonthSubmit = (event) => {
    event.preventDefault();
    setCurMonth(event.target.value);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="month-native-simple">Month</InputLabel>
        <Select
          native
          value={curMonth}
          onChange={handleMonthSubmit}
          inputProps={{
            name: "month",
            id: "month-native-simple",
          }}
        >
          <option aria-label={curMonth} value="" />
          <option value="01">Jan</option>
          <option value="02">Feb</option>
          <option value="03">Mar</option>
          <option value="04">Apr</option>
          <option value="05">May</option>
          <option value="06">June</option>
          <option value="07">July</option>
          <option value="08">Aug</option>
          <option value="09">Sept</option>
          <option value="10">Oct</option>
          <option value="11">Nov</option>
          <option value="12">Dec</option>
        </Select>
      </FormControl>
      <Grid container spacing={3} justify="center" alignContent="center">
        <Grid item xs={6}>
          <SubGrid name="Income" />
        </Grid>
        <Grid item xs={6}>
          <SubGrid name="Expense" />
        </Grid>
      </Grid>
    </div>
  );
};

export default MainGrid;
