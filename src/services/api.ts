import { AppError } from "@utils/AppError";
import axios, { AxiosInstance } from "axios"; // AxiosInstance have all which a instance axios possess

type SignOut = () => void;

type APIInstanceProps = AxiosInstance & {
  // let's create this type for insert the function which to will user logout of application case have token invalid
  registerInterceptTokenManager: (signOut: SignOut) => () => void; // this function which to will to manage the intercept of token in application
};

const api = axios.create({
  baseURL: "http://192.168.0.16:3333", // has part of the url that will not change in requests - remember that the IP address may change when accessing the internet again
}) as APIInstanceProps;

api.registerInterceptTokenManager = (signOut) => {
  const interceptTokenManager = api.interceptors.response.use(
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

  return () => {
    api.interceptors.response.eject(interceptTokenManager); // how we insert inside of constant the api interceptors, we can use the reference her
  };
};

export { api };
