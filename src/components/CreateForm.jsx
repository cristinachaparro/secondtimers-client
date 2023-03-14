import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  getCategoriesService,
  getCountriesService,
  newPostService,
} from "../services/post.services";

import axios from "axios";

function CreateForm(props) {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");

  const [title, setTitle] = useState("");
  const [country, setCountry] = useState("");
  const [countryOptions, setCountryOptions] = useState([]);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState([]);
  const [category, setCategory] = useState("");
  const [categoryOptions, setCategoryOptions] = useState([]);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleCountryChange = (e) => setCountry(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);

 const handleImageChange = (e) => setImage(e.target.files);

//  const handleImageChange = (e) => {
//   const imagesAdded = e.target.files;
//   const uploadedImages = [];

//   for (let i = 0; i < imagesAdded.length; i++) {
//     const file = imagesAdded[i];
//     uploadedImages.push(file);
      
//     };

//     setImage([...image, uploadedImages]);
//   };




  const handleCategoryChange = (e) => setCategory(e.target.value);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    // const countryList = await axios.get(
    //   "http://localhost:5005/api/destinations/country-list"
    // );
    const countryList = await getCountriesService();
    setCountryOptions(countryList.data);
    // const categoriesList = await axios.get(
    //   "http://localhost:5005/api/destinations/categories"
    // );
    const categoriesList = await getCategoriesService();
    setCategoryOptions(categoriesList.data);
    try {
    } catch (error) {}
  };

  const handlePost = async (e) => {
    e.preventDefault();

    const newPost = {
      title,
      country,
      description,
      image,
      category,
    };
    try {
      const response = await newPostService(newPost);
      navigate(`/destinations/${response.data.id}`);
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  return (
    <div>
      <h1>Create form</h1>
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

      <label>Upload Images:</label>
      <input type="file" id="image" multiple onChange={handleImageChange} />


        {/* <label>Image:</label>
        <input type="file" multiple name="image" onChange={handleImageChange} /> */}
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

export default CreateForm;
