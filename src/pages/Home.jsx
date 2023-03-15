import { Link } from "react-router-dom";

function Home() {
  return (
    <div id="home">
      <img src="../../public/logo.png" alt="" />
      <Link to="/destinations">
        <button>Destinations</button>
      </Link>
    </div>
  );
}

export default Home;
