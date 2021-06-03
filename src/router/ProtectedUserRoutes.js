import React from "react";
import { Route, Redirect } from "react-router-dom";

function ProtectedAdminRoutes({
  isAuth: isAuth,
  isUser: isUser,
  component: Component,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuth && isUser) {
          return <Component />;
        } else {
          return <Redirect
            to={{
              pathname: "/",
               state: { from: props.location }
            }}
          />;
        }
      }}
    />
  );
}

export default ProtectedAdminRoutes;
