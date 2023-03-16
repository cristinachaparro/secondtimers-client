import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  const navigate = useNavigate();
  const { isLoggedIn, authenticateUser } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    authenticateUser();
    navigate("/");
  };

  if (isLoggedIn === true) {
    return (
      <div id="navbar">
        <NavLink to="/">
          <img className="icon" src="LogoHouse.png" alt="Home icon" />
        </NavLink>
        <img
          className="icon"
          id="nav-logo"
          src="LogoNav.png"
          alt="secondtimers' logo"
        />
        <NavLink to="/destinations">
          <img className="icon" src="LogoPlane.png" alt="destinations icon" />
        </NavLink>
        <NavLink to="/profile">
          <img className="icon" src="LogoProfile.png" alt="profile icon" />
        </NavLink>
        <button className="reset-btn" onClick={handleLogout}>
          <img className="icon" src="LogoutLogo.png" alt="logout icon" />
        </button>
      </div>
    );
  } else {
    return (
      <div id="navbar">
        <NavLink to="/">
          <img className="icon" src="LogoHouse.png" alt="Home icon" />
        </NavLink>
        <NavLink to="/destinations">
          <img className="icon" src="LogoPlane.png" alt="destinations icon" />
        </NavLink>

        <NavLink to="/signup">Sign up</NavLink>
        <NavLink to="/login">Log in</NavLink>
      </div>
    );
  }
}

export default Navbar;
