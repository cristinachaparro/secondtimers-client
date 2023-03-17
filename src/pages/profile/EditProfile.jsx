import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { myProfileService } from "../../services/auth.services";

import { updatedProfileService } from "../../services/auth.services";
import { uploadImageService } from "../../services/upload.services";

function EditProfile() {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");

  const [username, setUsername] = useState("");
  // const [profilePicture, setProfilePicture] = useState("");
  const [location, setLocation] = useState("");
  const [age, setAge] = useState(0);

  const [imageUrl, setImageUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleLocationChange = (e) => setLocation(e.target.value);
  const handleAgeChange = (e) => setAge(e.target.value);
  const handleFileUpload = async (event) => {

    if (!event.target.files[0]) {
      // to prevent accidentally clicking the choose file button and not selecting a file
      return;
    }

    setIsUploading(true); // to start the loading animation

    const uploadData = new FormData(); // images and other files need to be sent to the backend in a FormData
    uploadData.append("image", event.target.files[0]);
    //                   |
    //     this name needs to match the name used in the middleware => uploader.single("image")

    try {
      const response = await uploadImageService(uploadData);

      setImageUrl(response.data.imageUrl);
      //                          |
      //     this is how the backend sends the image to the frontend => res.json({ imageUrl: req.file.path });

      setIsUploading(false); // to stop the loading animation
    } catch (error) {
      navigate("/error");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await myProfileService();

      setUsername(response.data.username);
      setLocation(response.data.location);
      setAge(response.data.age);
    } catch (error) {
      navigate("/error");
    }
  };

  const handleProfile = async (e) => {
    e.preventDefault();
    try {
      const updatedProfile = {
        username,
        profilePicture: imageUrl,
        location,
        age,
      };
      await updatedProfileService(updatedProfile);
      navigate("/profile");
    } catch (error) {
      navigate("/error");
    }
  };

  return (
    <div className="basic-form-container">
      <h1>Edit your profile:</h1>
      <form className="form" onSubmit={handleProfile}>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleUsernameChange}
        />
        <input
          type="file"
          name="image"
          onChange={handleFileUpload}
          disabled={isUploading}
        />
        <br />
        {isUploading ? <h3>Uploading image...</h3> : null}
        {imageUrl ? (
          <div>
            <img src={imageUrl} alt="img" width={200} />
          </div>
        ) : null}
        <label>Age:</label>
        <input
          type="number"
          name="age"
          value={age}
          onChange={handleAgeChange}
        />
        <label>Location:</label>
        <input
          type="text"
          name="location"
          value={location}
          onChange={handleLocationChange}
        />
        <br />
        <button className="standard-btn-post" type="submit">
          Upload
        </button>
        {errorMessage !== "" ? <p>{errorMessage}</p> : null}
      </form>
    </div>
  );
}

export default EditProfile;
