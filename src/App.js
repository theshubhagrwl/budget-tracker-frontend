import React from "react";
import Typography from "@material-ui/core/Typography";
import MainGrid from "./components/MainGrid";
// import Items from "./API/Items";

function App() {
  return (
    <div className="App">
      {/* <Items /> */}
      <Typography variant="h2" component="h1">
        Budget Tracker App
      </Typography>
      <MainGrid />
    </div>
  );
}

export default App;
