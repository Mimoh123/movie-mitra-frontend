import axios from "axios";

const BACKENDURL = import.meta.env.VITE_BACKEND_URL;
const PYTHON_BACKEND_URL = import.meta.env.VITE_PYTHON_URL;
console.log("this is the python backend url", PYTHON_BACKEND_URL);

export const axiosInstance = axios.create({ baseURL: BACKENDURL })
export const pythonAxiosInstance = axios.create({ baseURL: PYTHON_BACKEND_URL })


axiosInstance.interceptors.request.use((config) => {
 const token = localStorage.getItem("token");
 if (token) {
  config.headers.Authorization = `Bearer ${token}`;
 }
 return config
},
 (error) => {
  return Promise.reject(error)
 }
)

axiosInstance.interceptors.response.use((response) => {
 const newToken = response.headers.authorization;
 if (newToken && newToken.startsWith("Bearer ")) {
  const token = newToken.split(" ")[1];
  localStorage.setItem("token", token);

 }
 return response;
}, (error) => {
 if (error.response.status === 401) {
  setTimeout(() => {
   localStorage.removeItem("token");
   window.location.href = "/auth/login";
  }, 100);
 }
 return Promise.reject(error);
})