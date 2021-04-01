import Film from '../models/Film.js'

export const getFilms = async (req, res) => {
    try {
        const films = await Film.find()
        
        res.status(200).json(films)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const addFilm = async (req, res) => {
    const film = req.body
    try {
        const newFilm = new Film(film)
        console.log(newFilm)
        await newFilm.save()
        res.status(201).json(newFilm)
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}

export const deleteFilm = async (req, res) => {
    const {id} = req.params
    try {
        await Film.findByIdAndRemove(id)
        res.json({message: 'film deleted'})
    } catch (error) {
        console.log(error)
    }
}

export const searchFilm = async (req, res) => {
    const search = req.body.searchText
    if(typeof search !== 'string' || search.trim() === '') {
        res.json({message: 'not a valid search'})
    }

    try {
        const films = await Film.aggregate([
            {$match: {$text: {$search: search}}},
            {$sort: {score: {$meta: 'textScore'}}}
        ])
        
        res.status(200).json(films)
    } catch (error) {
        console.log(error)
    }
}