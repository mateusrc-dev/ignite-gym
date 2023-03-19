import axios from "axios";

export const api = axios.create({
  baseURL: "http://192.168.0.16:3333", // has part of the url that will not change in requests - remember that the IP address may change when accessing the internet again
});
