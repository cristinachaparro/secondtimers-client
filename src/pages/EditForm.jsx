import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getCountriesService,
  getCategoriesService,
  getPostService,
  updatedPostService,
} from "../services/post.services";
import { uploadImageService } from "../services/upload.services";

function EditForm() {
  const navigate = useNavigate();

  const params = useParams();

  const [errorMessage, setErrorMessage] = useState("");

  const [imageUrl, setImageUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const [title, setTitle] = useState("");
  const [country, setCountry] = useState("");
  const [countryOptions, setCountryOptions] = useState([]);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [categoryOptions, setCategoryOptions] = useState([]);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleCountryChange = (e) => setCountry(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
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

  const handleCategoryChange = (e) => setCategory(e.target.value);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const countryList = await getCountriesService();
    setCountryOptions(countryList.data);
    const categoriesList = await getCategoriesService();
    setCategoryOptions(categoriesList.data);
    try {
      const response = await getPostService(params.postId);
      setTitle(response.data.title);
      setCountry(response.data.country);
      setDescription(response.data.description);
      setCategory(response.data.category);
    } catch (error) {
      navigate("/error");
    }
  };

  const handlePost = async (e) => {
    e.preventDefault();
    try {
      const updatedPost = {
        title,
        country,
        description,
        image: [imageUrl],
        category,
      };
      await updatedPostService(params.postId, updatedPost);
      navigate(`/destinations/${params.postId}`);
    } catch (error) {
      navigate("/error");
    }
  };

  return (
    <div>
      <h1>Edit your post:</h1>
      <form onSubmit={handlePost}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={handleTitleChange}
        />
        <br />
        <label htmlFor="select">Country:</label>
        <select id="select" value={country} onChange={handleCountryChange}>
          <option value="">Select a country</option>
          {countryOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <br />
        <label>Description:</label>
        <input
          type="text"
          name="description"
          value={description}
          onChange={handleDescriptionChange}
        />
        <br />
        <input
          type="file"
          name="image"
          onChange={handleFileUpload}
          disabled={isUploading}
        />
        {isUploading ? <h3>Uploading image...</h3> : null}
        {imageUrl ? (
          <div>
            <img src={imageUrl} alt="img" width={200} />
          </div>
        ) : null}
        <br />
        <label htmlFor="select">Category:</label>
        <select id="select" value={category} onChange={handleCategoryChange}>
          <option value="">Select a category:</option>
          {categoryOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <br />
        <button type="submit">Upload</button>
        {errorMessage !== "" ? <p>{errorMessage}</p> : null}
      </form>
    </div>
  );
}

export default EditForm;
