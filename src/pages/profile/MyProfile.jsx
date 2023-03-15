import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { myProfileService } from "../../services/auth.services";
import { uploadImageService } from "../../services/upload.services";

function MyProfile() {
  const [singleProfile, setSingleProfile] = useState("");

  const [imageUrl, setImageUrl] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await myProfileService();
      setSingleProfile(response.data);
    } catch (error) {
      navigate("/error");
    }
  };

  return (
    <div>
      <h2>My profile</h2>
      <img src={imageUrl} alt="img" width={200} />
      <h4>{singleProfile.username}</h4>
      <h4>{singleProfile.email}</h4>
      <h4>{singleProfile.location}</h4>
      <h4>{singleProfile.age}</h4>
      <h2>My Favs</h2>

      <NavLink to="/profile/edit-form">
        <button>Edit</button>
      </NavLink>

      <NavLink to="/profile/favourites">
        <button>My Favourites</button>
      </NavLink>
    </div>
  );
}

export default MyProfile;
