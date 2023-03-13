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

const getPost = (postId) => {
  return service.get(`/destinations/${postId}`);
};

export { newPostService, destinationsService, updatedPost, getPost };
