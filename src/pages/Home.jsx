import { Link } from "react-router-dom";

function Home() {
  return (
    <div id="home">
      <img src="LogoHome.png" alt="secondtimers' logo" />
      <Link to="/destinations">
        <button className="standard-btn">Discover</button>
      </Link>
    </div>
  );
}

export default Home;
