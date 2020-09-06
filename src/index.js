import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
// import * as serviceWorker from "./serviceWorker";
import Routes from "./Routes";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./Theme";

// import { MuiPickersUtilsProvider } from "@material-ui/pickers";
// import MomentUtils from "@date-io/moment";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    {/* <MuiPickersUtilsProvider utils={MomentUtils}> */}
    <Routes />
    {/* </MuiPickersUtilsProvider> */}
  </ThemeProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
