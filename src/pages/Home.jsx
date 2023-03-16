import { Link } from "react-router-dom";

function Home() {
  return (
    <div id="home">
      <img
        src="https://res.cloudinary.com/dn6kyb2kf/image/upload/v1678976697/secondtimers/icons/LogoHome_mktecs.png"
        alt="secondtimers' logo"
      />
      <Link to="/destinations">
        <button className="standard-btn">Discover</button>
      </Link>
    </div>
  );
}

export default Home;
