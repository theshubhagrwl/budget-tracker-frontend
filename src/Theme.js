import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    h2: {
      fontWeight: 450,
      margin: "1rem",
    },
  },
  flexDiv: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    flexDirection: "column",
  },
});

export default theme;
