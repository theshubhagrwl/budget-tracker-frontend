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
    minWidth: 150,
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
          <option value="01">January</option>
          <option value="02">February</option>
          <option value="03">March</option>
          <option value="04">April</option>
          <option value="05">May</option>
          <option value="06">June</option>
          <option value="07">July</option>
          <option value="08">August</option>
          <option value="09">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </Select>
        <FormHelperText>Filter by month</FormHelperText>
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
