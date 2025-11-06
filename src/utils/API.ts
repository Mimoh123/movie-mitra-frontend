import axios from "axios";


const apikey = import.meta.env.VITE_API_KEY;

export const getAllMovies = async (page: number = 1) => {
 try {

  const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apikey}&page=${page}`)
  return response.data
 }
 catch (err) {
  throw err
 }
}


