import React from "react";
import { Route, Switch } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";

const Routing = () => {
  return (
    <Switch>
      <Route exact path="/" component={LoginPage} />
      <Route exact path="/signup" component={SignupPage} />
      <Route exact path="/dashboard" component={DashboardPage} />
    </Switch>
  );
};

export default Routing;
