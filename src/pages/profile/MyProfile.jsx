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
    <div id="profile">
      <h1>My profile</h1>
      <img id="profile-img" src={singleProfile.profilePicture} alt="img" />
      <h2>{singleProfile.username}</h2>
      <h4>{singleProfile.email}</h4>
      <h4>
        <img
          className="location-icon"
          src="https://res.cloudinary.com/dn6kyb2kf/image/upload/v1678976696/secondtimers/icons/LogoDarkPoint_vq2ghz.png"
          alt="pin icon"
        />
        {singleProfile.location}
      </h4>
      <h4>{singleProfile.age}</h4>

      <NavLink to="/profile/favourites">
        <button id="fav-btn">Favourites</button>
      </NavLink>

      <NavLink to="/profile/edit-form">
        <button className="standard-btn">Edit Profile</button>
      </NavLink>
    </div>
  );
}

export default MyProfile;
