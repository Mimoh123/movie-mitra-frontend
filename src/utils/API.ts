import axios from "axios";


const apikey = import.meta.env.VITE_API_KEY;

export const getAllMovies = async () => {
 try {
  console.log("this is the api route", `https://api.themoviedb.org/3/movie/popular?api_key=${apikey}`)
  console.log("this is the api key", apikey)
  const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apikey}`)
  return response.data
 }
 catch (err) {
  throw err
 }
}


