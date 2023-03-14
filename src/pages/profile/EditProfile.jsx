import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { myProfileService } from "../../services/auth.services";

import { updatedProfileService } from "../../services/auth.services";



function EditProfile() {
  const navigate = useNavigate()

  const [errorMessage, setErrorMessage] = useState("");

  const [username, setUsername] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [location, setLocation] = useState("");
  const [age, setAge] = useState(0);

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleProfilePictureChange = (e) => setProfilePicture(e.target.value);
  const handleLocationChange = (e) => setLocation(e.target.value);
  const handleAgeChange = (e) => setAge(e.target.value);

  useEffect(() => {
    getData();
  }, []);

  const getData = async() => {
    
      try {
        const response = await myProfileService()

        setUsername(response.data.username);
        setProfilePicture(response.data.profilePicture);
        setLocation(response.data.location);
        setAge(response.data.age);
        
    } catch (error) {
      navigate("/error")
    }
  }

  const handleProfile = async (e) => {
    e.preventDefault();
    try {
      const updatedProfile = {
        username,
        profilePicture,
        location,
        age
      };
      await updatedProfileService(updatedProfile);
      navigate("/profile");
    } catch (error) {
      navigate("/error");
    }
  };


  return (
  <div>
      <h1>Edit your profile:</h1>
      <form onSubmit={handleProfile}>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleUsernameChange}
        />
        <br />
        <label>Profile Picture:</label>
        <input
          type="file"
          name="profilePicture"
          // value={profilePicture}
          onChange={handleProfilePictureChange}
        />
        <br />
        <label>Age:</label>
        <input
          type="number"
          name="age"
          value={age}
          onChange={handleAgeChange}
        />
        <br />
        <label>Location:</label>
        <input
          type="text"
          name="location"
          value={location}
          onChange={handleLocationChange}
        />
        
        <br />
        <button type="submit">Upload</button>
        {errorMessage !== "" ? <p>{errorMessage}</p> : null}
      </form>
    </div>
  );
}

export default EditProfile;
