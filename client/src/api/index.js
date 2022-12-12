import axios from "axios";

const url = "http://localhost:8000";

export const getFilms = async () => {
  const films = await axios.get(url);
  return films;
};

export const addFilm = async (film) => {
  const newFilm = await axios.post(`${url}/add`, film);
  return newFilm;
};

export const importFilms = (filmsObjs) =>
  axios.patch(`${url}/import`, filmsObjs);

export const deleteFilm = (id) => axios.delete(`${url}/${id}/delete`);

export const searchFilm = (str) =>
  axios.post(`${url}/search`, { searchText: str });
