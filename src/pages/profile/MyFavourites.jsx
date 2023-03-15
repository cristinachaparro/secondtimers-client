import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteFavouriteService,
  myFavouritesService,
} from "../../services/auth.services";

function MyFavourites() {
  const params = useParams();

  const [favourites, setFavourites] = useState("");
  const [postFavourites, setPostFavourites] = useState([]);

  const [isFetching, setIsFetching] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await myFavouritesService();
      setFavourites(response.data);
      setPostFavourites(favourites.data);
      setIsFetching(false);
      //console.log(response.data)
    } catch (error) {
      navigate("/error");
    }
  };

  const handleDeleteFavourite = async (postId) => {
    try {
      await deleteFavouriteService(postId);
      console.log(postId);
      getData();
      navigate(`/profile/favourites`);
    } catch (error) {
      navigate("/error");
    }
    const filteredFavourites = postFavourites.filter((eachFav) => {
      if (eachFav._id === params.postId) {
        return false;
      } else {
        return true;
      }
    });
    setPostFavourites(filteredFavourites);
  };

  return (
    <div>
      {isFetching === true ? (
        <h3>Loading...</h3>
      ) : (
        <div>
          <h2>My favourites</h2>
          {favourites.favouritePosts.map((each) => {
            return (
              <div>
                <h4>{each.title}</h4>
                <button onClick={() => handleDeleteFavourite(each._id)}>
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MyFavourites;
