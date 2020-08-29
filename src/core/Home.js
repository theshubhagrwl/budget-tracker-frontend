import React from "react";
import { signout } from "../auth";
import { useHistory } from "react-router-dom";
import MainGrid from "./MainGrid";
import { BudgetProvider } from "../BudgetContext";

export default function Home() {
  let history = useHistory();

  return (
    <BudgetProvider>
      <h1>Budget Tracker Home</h1>
      <div>
        <span
          onClick={() => {
            signout(() => {
              history.push("/signin");
            });
          }}
        >
          Signout
        </span>
      </div>

      <MainGrid />
    </BudgetProvider>
  );
}
