import React, { useContext } from "react";
import { Grid, Typography, Box } from "@material-ui/core";
import SubGrid from "./SubGrid";
import { BudgetContext } from "../BudgetContext";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import Chart from "./Chart";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
  },
  deleteButton: {
    backgroundColor: "#e53935",
    color: "white",
  },
  flexStyle: {
    display: "flex",
    justifyContent: "center",
  },
}));

const MainGrid = () => {
  const classes = useStyles();
  const { month, income, expense } = useContext(BudgetContext);
  const [curMonth, setCurMonth] = month;
  const [incomeData, setIncomeData] = income;
  const [expenseData, setExpenseData] = expense;

  const handleMonthSubmit = (event) => {
    event.preventDefault();
    setCurMonth(event.target.value);
  };

  return (
    <Box component="div" style={{ marginTop: "1rem" }}>
      {curMonth === "All" ? (
        ""
      ) : (
        <Typography variant="h6" component="h6" style={{ fontWeight: "200" }}>
          Select a month to Filter data
        </Typography>
      )}
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
          {/* <option aria-label={curMonth} value="" /> */}
          <option value="all">All</option>
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
      <br />
      <Grid container justify="center" alignContent="center">
        {incomeData.length > 1 ? (
          <Grid item xs={12} sm={6}>
            <Chart
              data={incomeData}
              fill="#45CE30"
              stroke="#019031"
              name="Income"
            />
          </Grid>
        ) : (
          ""
        )}
        {expenseData.length > 1 ? (
          <Grid item xs={12} sm={6}>
            <Chart
              data={expenseData}
              fill="#FF362E"
              stroke="#B83227"
              name="Expense"
            />
          </Grid>
        ) : (
          ""
        )}
      </Grid>
    </Box>
  );
};

export default MainGrid;
