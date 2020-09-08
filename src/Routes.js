import React from "react";
// import { BrowserRouter, Switch, Route } from "react-router-dom";
import { HashRouter, Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import PrivateRoutes from "./auth/PrivateRoutes";

import Signup from "./user/Signup";
import Signin from "./user/Signin";
import WelcomePage from "./core/WelcomePage";

const Routes = () => {
  return (
    <div>
      <HashRouter>
        <Switch>
          <Route path="/" exact component={WelcomePage} />
          <Route path="/signin" exact component={Signin} />
          <Route path="/signup" exact component={Signup} />
          <PrivateRoutes path="/user/dashboard" exact component={Home} />
        </Switch>
      </HashRouter>
    </div>
  );
};

export default Routes;
