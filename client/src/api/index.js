import axios from 'axios'

const url = 'http://localhost:5000'

// export const getFilms = async () => {
//     try {
//         const {data} = await axios.get(url)
//         console.log(data)
//         return data
//     } catch (error) {
//         console.log(error)
//     }
// }

export const getFilms = () => axios.get(url)

export const addFilm = (film) => axios.post(`${url}/add`, film)

export const deleteFilm = (id) => axios.delete(`${url}/${id}/delete`)

export const searchFilm = (str) => axios.post(`${url}/search`, {searchText: str})