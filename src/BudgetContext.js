import React, { useState, useEffect, createContext } from "react";
import { getData } from "./core/coreapicalls";
import { isAuthenticated } from "./auth";

export const BudgetContext = createContext();

export const BudgetProvider = (props) => {
  const userId = isAuthenticated() && isAuthenticated().user.id;

  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const [curMonth, setCurMonth] = useState("");

  const loadData = () => {
    getData()
      .then((data) => {
        //getting and setting the data
        if (data) {
          var fData = data.filter(
            (item) => item.user === userId && item.itemType === "income"
          );
          setIncomeData(fData);
          fData = data.filter(
            (item) => item.user === userId && item.itemType === "expense"
          );
          setExpenseData(fData);
        }
      })
      .catch((err) => console.log("ERR", err));
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <BudgetContext.Provider
      value={{
        income: [incomeData, setIncomeData],
        expense: [expenseData, setExpenseData],
        sUpdate: [shouldUpdate, setShouldUpdate],
        month: [curMonth, setCurMonth],
      }}
    >
      {props.children}
    </BudgetContext.Provider>
  );
};
