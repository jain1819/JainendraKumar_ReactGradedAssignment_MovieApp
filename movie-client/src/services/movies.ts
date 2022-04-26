import axios from "axios";
import IMovie from "../model/IMovie";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const getMovies = async (moviesCategory: string) => {
  const response = await axios.get<IMovie[]>(`${baseUrl}${moviesCategory}`);
  return response.data;
};

const getMovieById = async (moviesCategory: string, id: string | number) => {
  const response = await axios.get<IMovie>(`${baseUrl}${moviesCategory}/${id}`);
  return response.data;
};

const getMovieByTitle = async (
  moviesCategory: string,
  title: string | number
) => {
  const response = await axios.get<IMovie[]>(
    `${baseUrl}${moviesCategory}/?title=${title}`
  );
  return response.data[0];
};

const searchMovieByTitle = async (
  moviesCategory: string,
  title: string | number
) => {
  const response = await axios.get<IMovie[]>(
    `${baseUrl}${moviesCategory}/?title_like=${title}`
  );
  return response.data[0];
};

const addMovie = async (moviesCategory: string, movie: IMovie) => {
  return axios
    .post<IMovie[]>(`${baseUrl}${moviesCategory}`, movie, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.data);
};

export {
  getMovies,
  getMovieById,
  getMovieByTitle,
  searchMovieByTitle,
  addMovie,
};