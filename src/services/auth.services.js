import service from "./config.services";

const signupService = (newUser) => {
  return service.post("/auth/signup", newUser);
};

const loginService = (userCredentials) => {
  return service.post("/auth/login", userCredentials);
};

const verifyService = () => {
  //make sure we send the token
  return service.get("/auth/verify");
};

const myProfileService = () => {
  return service.get("/profile");
};

const updatedProfileService = (updatedProfile) => {
  return service.patch("/profile/edit-form", updatedProfile);
};

const myFavouritesService = () => {
  return service.get("/profile/favourites");
};

const addFavouriteService = (postId) => {
  return service.post(`/destinations/${postId}/favourite`);
};

const deleteFavouriteService = (postId) => {
  return service.post(`/profile/favourite/${postId}/delete`);
};

export {
  signupService,
  loginService,
  verifyService,
  myProfileService,
  updatedProfileService,
  myFavouritesService,
  addFavouriteService,
  deleteFavouriteService,
};
