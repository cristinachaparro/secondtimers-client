import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { destinationsService } from "../services/post.services";

function Destinations() {
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
      <Link to={"/destinations/create-form"}>
        <button className="standard-btn">Create</button>
      </Link>
      {allPosts.map((eachPost) => {
        return (
          <div className="post-container" key={eachPost._id}>
            <p id="title-container">
              <Link
                className="destinations-title"
                to={`/destinations/${eachPost._id}`}
              >
                {eachPost.title}
              </Link>
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
          </div>
        );
      })}
    </div>
  );
}

export default Destinations;
