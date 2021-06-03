import React, { useState, useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { AdminContext } from "../context/AdminAuthContext";
import DashboardPage from "../pages/Employee/DashboardPage";
import CustomerDashboardPage from "../pages/Customer/CustomerDashboardPage"

import LoginPage from "../pages/Customer/LoginPage";
import SignupPage from "../pages/Customer/SignupPage";
import ProtectedAdminRoutes from "./ProtectedAdminRoutes";
import ProtectedUserRoutes from "./ProtectedUserRoutes";
import EmployeeLoginPage from "../pages/Employee/EmployeeLoginPage";
import CheckoutForm from "../pages/Checkout/CheckoutStripe";
import CheckoutPaypalPage from "../pages/Checkout/CheckoutPaypal";

const Routing = () => {
  const { isAuth,isAdmin,isUser } = useContext(AdminContext);
  return (
    <Router>
      <Route exact path="/" component={LoginPage} />
      <Route exact path="/employee" component={EmployeeLoginPage} />
      <Route exact path="/signup" component={SignupPage} />
      <Route exact path="/checkout/stripe/:id" render={(props) => <CheckoutForm {...props} />} />
      <Route exact path="/checkout/paypal/:id" render={(props) => <CheckoutPaypalPage {...props} />} />

      <ProtectedAdminRoutes
        path="/dashboard"
        component={DashboardPage}
        isAuth={isAuth}
        isAdmin={isAdmin}
      />
      <ProtectedUserRoutes
        path="/home"
        component={CustomerDashboardPage}
        isAuth={isAuth}
        isUser={isUser}
      />
    </Router>
  );
};

export default Routing;
