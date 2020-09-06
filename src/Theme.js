import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    h2: {
      fontWeight: 450,
      margin: "1rem",
    },
    subtitle2: {
      fontWeight: 200,
    },
    body1: {
      fontWeight: 400,
    },
  },
  flexDiv: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    flexDirection: "column",
  },
  blackButton: {
    backgroundColor: "#212121",
    color: "#fff",
    border: "1px solid black",
    "&:hover": {
      background: "white",
      border: "0.5px solid black",
      color: "black",
    },
  },
  greenButton: {
    backgroundColor: "#00c853",
    border: "1px solid #00c853",
    color: "white",
    "&:hover": {
      background: "white",
      color: "#00c853",
      border: "1px solid #00c853",
    },
    // [theme.breakpoints.down("sm")]: {
    // width: "50%",
    // },
  },
});

export default theme;
