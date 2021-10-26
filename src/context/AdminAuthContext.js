import React, { createContext, useState } from "react";

export const AdminContext = createContext();

export const AdminProvider = (props) => {
  const auth = localStorage.getItem("auth");
  const admin = localStorage.getItem("isAdmin");
  const user = localStorage.getItem("isUser");

  const [isAuth, setIsAuth] = useState(auth);
  const [isAdmin, setIsAdmin] = useState(admin);
  const [isUser, setIsUser] = useState(user);

  return (
    <AdminContext.Provider
      value={{ isAuth, setIsAuth, isAdmin, setIsAdmin, isUser, setIsUser }}
    >
      {props.children}
    </AdminContext.Provider>
  );
};
