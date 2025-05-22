import { createContext, useState, useEffect } from "react";

export const AccountContext = createContext(null);

export const AccountProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  //load user for different routes
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser));
    }
  }, []);

  // when user sign in or sign out
  useEffect(() => {
    if (loggedInUser) {
      localStorage.setItem("user", JSON.stringify(loggedInUser));
    } else {
      //clear all user data and vote data
      localStorage.clear();
    }
  }, [loggedInUser]);

  return (
    <AccountContext.Provider
      value={{ loggedInUser: loggedInUser, setLoggedInUser: setLoggedInUser }}
    >
      {children}
    </AccountContext.Provider>
  );
};
