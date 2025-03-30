import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:4000",
});

// BAckend server port
// export const axiosInstance = axios.create({
//   baseURL: "https://ec-backend-9iyl.onrender.com",
// });
