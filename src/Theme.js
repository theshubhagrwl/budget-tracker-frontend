import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    h2: {
      fontWeight: 450,
      margin: "1rem",
    },
    subtitle2: {
      fontWeight: 200,
      // fontFamily : 'Roboto'
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
});

export default theme;
