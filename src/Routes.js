import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import PrivateRoutes from "./auth/PrivateRoutes";

import Signup from "./user/Signup";
import Signin from "./user/Signin";
import WelcomePage from "./core/WelcomePage";

const Routes = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={WelcomePage} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/signin" component={Signin} />
          <PrivateRoutes path="/user/dashboard" exact component={Home} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default Routes;
