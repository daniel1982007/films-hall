import axios from "axios";

const url = "http://localhost:8000";

export const getFilms = () => axios.get(url);

export const addFilm = (film) => axios.post(`${url}/add`, film);

export const importFilms = (filmsObjs) =>
  axios.patch(`${url}/import`, filmsObjs);

export const deleteFilm = (id) => axios.delete(`${url}/${id}/delete`);

export const searchFilm = (str) =>
  axios.post(`${url}/search`, { searchText: str });
