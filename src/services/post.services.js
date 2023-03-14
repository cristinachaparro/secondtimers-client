import service from "./config.services";

const newPostService = (newPost) => {
  return service.post("/destinations/create-form", newPost);
};

const destinationsService = () => {
  return service.get("/destinations");
};

const updatedPostService = (postId, updatedPost) => {
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

const getCommentsService = (postId) => {
  return service.get(`/destinations/${postId}/comment`);
};

const newCommentService = (postId, newComment) => {
  return service.post(`/destinations/${postId}/comment`, newComment);
};

const editCommentService = (commentId, updatedComment) => {
  return service.patch(`/destinations/${commentId}`, updatedComment);
};

const deleteCommentService = (commentId) => {
  return service.delete(`/destinations/${commentId}`);
};

export {
  newPostService,
  destinationsService,
  updatedPostService,
  getPostService,
  deletePostService,
  getCountriesService,
  getCategoriesService,
  getCommentsService,
  newCommentService,
  editCommentService,
  deleteCommentService,
};
