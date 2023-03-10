import axios from "axios";

import { useState, useEffect } from "react";

import { Navigate, useNavigate } from "react-router-dom";

function Destinations() {
  const navigate = useNavigate();

  const [posts, setAllPosts] = useState("");
  const [isFetching, setIsFetching] = useState();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      setIsFetching(true);
      const response = await axios.get(
        "http://localhost:5005/api/destinations"
      );
      setAllPosts(response.data);
      setIsFetching(false);
    } catch (error) {
      navigate("/error");
    }
  };

  return <div>Destinations</div>;
}

export default Destinations;
