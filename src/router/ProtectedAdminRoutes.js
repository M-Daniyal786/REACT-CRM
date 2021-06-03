import React from "react";
import { Route, Redirect } from "react-router-dom";

function ProtectedAdminRoutes({
  isAuth: isAuth,
  isAdmin: isAdmin,
  component: Component,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuth && isAdmin) {
          return <Component />;
        } else {
          return <Redirect
            to={{
              pathname: "/employee",
               state: { from: props.location }
            }}
          />;
        }
      }}
    />
  );
}

export default ProtectedAdminRoutes;
