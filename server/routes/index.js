import express from 'express'
import {getFilms, addFilm, deleteFilm, searchFilm} from '../controllers/index.js'

const router = express.Router()

router.get('/', getFilms)
router.post('/add', addFilm)
router.delete('/:id/delete', deleteFilm)
router.post('/search', searchFilm)


export default router