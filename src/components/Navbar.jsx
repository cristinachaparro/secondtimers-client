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
          <img
            className="icon"
            src="https://res.cloudinary.com/dn6kyb2kf/image/upload/v1678976696/secondtimers/icons/LogoHouse_upk1fo.png"
            alt="Home icon"
          />
        </NavLink>
        <img
          className="icon"
          id="nav-logo"
          src="https://res.cloudinary.com/dn6kyb2kf/image/upload/v1678976697/secondtimers/icons/LogoNav_fly99r.png"
          alt="secondtimers' logo"
        />
        <NavLink to="/destinations">
          <img
            className="icon"
            src="https://res.cloudinary.com/dn6kyb2kf/image/upload/v1678976696/secondtimers/icons/LogoPlane_v8oqv3.png"
            alt="destinations icon"
          />
        </NavLink>
        <NavLink to="/profile">
          <img
            className="icon"
            src="https://res.cloudinary.com/dn6kyb2kf/image/upload/v1678976697/secondtimers/icons/LogoProfile_qsbgfi.png"
            alt="profile icon"
          />
        </NavLink>
        <button className="reset-btn" onClick={handleLogout}>
          <img
            className="icon"
            src="https://res.cloudinary.com/dn6kyb2kf/image/upload/v1678976696/secondtimers/icons/LogoutLogo_r5odko.png"
            alt="logout icon"
          />
        </button>
      </div>
    );
  } else {
    return (
      <div id="navbar">
        <NavLink to="/">
          <img
            className="icon"
            src="https://res.cloudinary.com/dn6kyb2kf/image/upload/v1678976696/secondtimers/icons/LogoHouse_upk1fo.png"
            alt="Home icon"
          />
        </NavLink>
        <img
          className="icon"
          id="nav-logo"
          src="https://res.cloudinary.com/dn6kyb2kf/image/upload/v1678976697/secondtimers/icons/LogoNav_fly99r.png"
          alt="secondtimers' logo"
        />
        <NavLink to="/destinations">
          <img
            className="icon"
            src="https://res.cloudinary.com/dn6kyb2kf/image/upload/v1678976696/secondtimers/icons/LogoPlane_v8oqv3.png"
            alt="destinations icon"
          />
        </NavLink>

        <NavLink to="/signup">
          <img
            className="icon"
            src="https://res.cloudinary.com/dn6kyb2kf/image/upload/v1678976696/secondtimers/icons/LogoSignUp_l9erfv.png"
            alt="singup icon"
          />
        </NavLink>
        <NavLink to="/login">
          <img
            className="icon"
            src="https://res.cloudinary.com/dn6kyb2kf/image/upload/v1678976696/secondtimers/icons/LogoLogin_ogpuho.png"
            alt="login icon"
          />
        </NavLink>
      </div>
    );
  }
}

export default Navbar;
