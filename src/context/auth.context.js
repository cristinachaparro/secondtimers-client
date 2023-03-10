import { createContext, useState, useEffect } from "react";
import { verifyService } from "../services/auth.services";

const AuthContext = createContext();

function AuthWrapper(props) {
  //auth states
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedUser, setLoggedUser] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  //auth functions

  //this function contacts with BE to validate the token
  const authenticateUser = async () => {
    setIsFetching(true);
    try {
      const response = await verifyService();
      console.log("Valid token.");
      console.log(response);
      setIsLoggedIn(true);
      setLoggedUser(response.data);
      setIsFetching(false);
    } catch (error) {
      console.log("Invalid token.");
      console.log(error);
      setIsLoggedIn(false);
      setLoggedUser(null);
      setIsFetching(false);
    }
  };

  useEffect(() => {
    authenticateUser(); //authenticates the user's token when they visit or refresh the site
  }, []);

  const passedContext = {
    isLoggedIn,
    loggedUser,
    authenticateUser,
  };

  if (isFetching === true) {
    return (
      <div className="App">
        <h2>... validando credenciales</h2>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={passedContext}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthWrapper };
