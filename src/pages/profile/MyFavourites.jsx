import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { myProfileService } from "../../services/auth.services";

function MyFavourites() {
  const [favourites, setFavourites] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await myProfileService();
      setFavourites(response.data);
    } catch (error) {
      navigate("/error");
    }
  };

  console.log(favourites)

  return (

    <div>
        <h2>HOLA FAVORITOS</h2>
    </div>

  );
  
  
}

export default MyFavourites;
