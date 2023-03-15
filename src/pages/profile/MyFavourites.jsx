import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { myFavouritesService } from "../../services/auth.services";

function MyFavourites() {
  const [favourites, setFavourites] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await myFavouritesService();
      setFavourites(response.data);
      //console.log(response.data)
    } catch (error) {
      navigate("/error");
    }
  };

console.log(favourites.favouritePosts)

  return (

    <div>
        <h2>HOLA FAVORITOS</h2>
        {/* {favourites.favouritePosts.map((each) => {
            return (
                <h4>{each.title}</h4>
            )
        })} */}

    </div>

  );
  
  
}

export default MyFavourites;
