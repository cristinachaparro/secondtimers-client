import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  const navigate = useNavigate()
  const { isLoggedIn, authenticateUser } = useContext(AuthContext)

  const handleLogout = () => {

    localStorage.removeItem("authToken")
    authenticateUser()
    navigate("/")
  }

if(isLoggedIn === true) {
  return (
    <div>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/destinations">Destinations</NavLink>
      <NavLink to="/profile">My profile</NavLink>
      <button onClick={handleLogout}>Logout</button>


    </div>
    );

} else {
  return (
    <div>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/destinations">Destinations</NavLink>

      <NavLink to="/signup">Sign up</NavLink>
      <NavLink to="/login">Log in</NavLink>
    </div>
    );

}

  
}

export default Navbar;
