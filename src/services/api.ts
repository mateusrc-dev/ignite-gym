import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.0.16:3333", // has part of the url that will not change in requests - remember that the IP address may change when accessing the internet again
});

api.interceptors.response.use(
  (response) => {
    console.log("interceptor response => ", response)
    return response; // this callback is necessary because the application flow needs to continue
  },
  (error) => {
    console.log("interceptor response error => ", error)
    return Promise.reject(error);
  }
);

export { api };
