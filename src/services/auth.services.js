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

export { signupService, loginService, verifyService };
