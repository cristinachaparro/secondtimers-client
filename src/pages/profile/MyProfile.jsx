import { useState, useEffect, NavLink } from "react";
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
      <h4>{singleProfile.profilePicture}</h4>
      <h4>{singleProfile.username}</h4>
      <h4>{singleProfile.email}</h4>
      <h4>{singleProfile.location}</h4>
      <h4>{singleProfile.age}</h4>

      {/* <NavLink to="/profile/edit-form">
        <button>Edit</button>
      </NavLink> */}
    </div>
  );
}

export default MyProfile;
