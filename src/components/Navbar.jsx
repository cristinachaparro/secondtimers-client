import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/destinations">Destinations</NavLink>

      <NavLink to="/signup">Sign up</NavLink>
      <NavLink to="/login">Log in</NavLink>
    </div>
  );
}

export default Navbar;
