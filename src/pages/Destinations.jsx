import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

import { destinationsService } from "../services/post.services";

import { AuthContext } from "../context/auth.context";

function Destinations() {
  const { loggedUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const [allPosts, setAllPosts] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setIsFetching(true);
    try {
      const response = await destinationsService();
      setAllPosts(response.data);
      setIsFetching(false);
    } catch (error) {
      navigate("/error");
    }
  };

  if (isFetching === true) {
    return <h3>Loading...</h3>;
  }

  return (
    <div id="posts-list">
      <h1>Destinations</h1>

      {loggedUser ? (
        <Link to={"/destinations/create-form"}>
          <button className="standard-btn">Create</button>
        </Link>
      ) : null}
      {allPosts.map((eachPost) => {
        return (
          <Link
            key={eachPost._id}
            className="post-container"
            to={`/destinations/${eachPost._id}`}
          >
            <p id="title-container">
              <h3 className="destinations-title">{eachPost.title}</h3>
            </p>
            <p className="location-name">
              <img
                className="location-icon"
                src="LogoDarkPoint.png"
                alt="point icon"
              />{" "}
              {eachPost.country}
            </p>
            <img
              className="destinations-img"
              src={eachPost.image}
              alt={eachPost.title}
            />
          </Link>
        );
      })}
    </div>
  );
}

export default Destinations;
