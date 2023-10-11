import React, { useState } from "react";

import { useLocalStorage } from "../hooks/useLocalStorage";
import { checkLoggedIn } from "../api/user";

export const AuthContext = React.createContext();

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useLocalStorage("user", null);
  const [cart, setcart] = useState([]);
  // function checkAuth() {
  //   checkLoggedIn().then((activeUser) => {
  //     if (activeUser) {
  //       // setCurrentUser(activeUser.access_token);
  //     } else {
  //       setCurrentUser(null);
  //     }
  //   });
  // }

  const value = {
    currentUser,
    setUser: setCurrentUser,
    cart,
    setcart,
    // checkAuth,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export default AuthProvider;
