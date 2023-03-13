import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getCountriesService,
  getCategoriesService,
  getPostService,
  updatedPostService,
} from "../services/post.services";

function EditForm() {
  const navigate = useNavigate();

  const params = useParams();

  const [errorMessage, setErrorMessage] = useState("");

  const [title, setTitle] = useState("");
  const [country, setCountry] = useState("");
  const [countryOptions, setCountryOptions] = useState([]);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [categoryOptions, setCategoryOptions] = useState([]);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleCountryChange = (e) => setCountry(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleImageChange = (e) => setImage(e.target.value);
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
      setImage(response.data.image);
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
        image,
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
        <label>Image:</label>
        <input type="file" name="image" onChange={handleImageChange} />
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
