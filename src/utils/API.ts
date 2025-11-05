import axios from "axios";


const apikey = import.meta.env.VITE_API_KEY;

export const getAllMovies = async () => {
 try {

  const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apikey}&page=4`)
  return response.data
 }
 catch (err) {
  throw err
 }
}


