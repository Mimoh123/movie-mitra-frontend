import axios from "axios";


const apikey = import.meta.env.VITE_API_KEY;
const baseUrl = import.meta.env.VITE_BACKEND_URL;

export const registerApi = async (name: string, email: string, password: string) => {
 try {
  const response = await axios.post(`${baseUrl}/register`, { name, email, password })
  return response.data
 }
 catch (err) {
  if (err instanceof Error) throw err
  else throw new Error("Failed to register user")
 }
}
export const loginApi = async (email: string, password: string) => {
 try {
  const response = await axios.post(`${baseUrl}/login`, { email, password })
  return response.data
 }
 catch (err) {
  if (err instanceof Error) throw err
  else throw new Error("Failed to login user")
 }
}

export const getAllMovies = async (page: number = 1) => {
 try {
  const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apikey}&page=${page}`)
  return response.data
 }
 catch (err) {
  throw err
 }
}


