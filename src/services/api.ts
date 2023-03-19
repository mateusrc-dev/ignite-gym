import { AppError } from "@utils/AppError";
import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.0.16:3333", // has part of the url that will not change in requests - remember that the IP address may change when accessing the internet again
});

api.interceptors.response.use(
  (response) => response, // this callback is necessary because the application flow needs to continue
  (error) => {
    if (error.response && error.response.data) {
      // verifying if message is treated in backend - now we can distinct between message treated and untreated
      return Promise.reject(new AppError(error.response.data.message)); // we let's create new error - new default of error
    } else {
      return Promise.reject(error);
    }
  }
);

export { api };
