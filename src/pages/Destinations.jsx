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
    <div>
      <h1>Destinations</h1>
      <Link to={"/destinations/create-form"}>Create</Link>
      {allPosts.map((eachPost) => {
        return (
          <div>
            <p key={eachPost._id}>
              <Link to={`/destinations/${eachPost._id}`}>{eachPost.title}</Link>
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default Destinations;
