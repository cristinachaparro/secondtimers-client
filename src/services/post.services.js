import service from "./config.services";

const newPostService = (newPost) => {
  return service.post("/destinations/create-form", newPost);
};

const destinationsService = () => {
  return service.get("/destinations");
};

const updatedPost = (postId, updatedPost) => {
  return service.patch(`/destinations/${postId}`, updatedPost);
};

const getPostService = (postId) => {
  return service.get(`/destinations/${postId}`);
};

const deletePostService = (postId) => {
  return service.delete(`/destinations/${postId}`);
};

const getCountriesService = () => {
  return service.get("/destinations/country-list");
};

const getCategoriesService = () => {
  return service.get("/destinations/categories");
};

export {
  newPostService,
  destinationsService,
  updatedPost,
  getPostService,
  deletePostService,
  getCountriesService,
  getCategoriesService,
};
