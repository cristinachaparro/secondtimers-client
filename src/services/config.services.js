import axios from "axios";

//all calls to BE will be from here
const service = axios.create({
  baseURL: "http://localhost:5005/api",
});

//all calls to this service will have the token
service.interceptors.request.use((config) => {
  //intercepts the call to add the token

  //takes token from LocalStorage
  const storedToken = localStorage.getItem("authToken");
  const tokenAndType = `Bearer ${storedToken}`;

  if (storedToken) {
    config.headers.authorization = tokenAndType;
  }

  return config;
});

export default service;
