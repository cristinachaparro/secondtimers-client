import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { myProfileService } from "../../services/auth.services";

function MyProfile() {
  const [singleProfile, setSingleProfile] = useState("");

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
      <img src={singleProfile.profilePicture} alt="" width="200px" />
      <h4>{singleProfile.username}</h4>
      <h4>{singleProfile.email}</h4>
      <h4>{singleProfile.location}</h4>
      <h4>{singleProfile.age}</h4>  

      <NavLink to="/profile/edit-form">
        <button>Edit</button>
      </NavLink>

    </div>
  );
}

export default MyProfile;
