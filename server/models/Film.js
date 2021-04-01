import mongoose from 'mongoose'

const schema = mongoose.Schema({
    Title: { 
        type: String,
        required: true
    },

    ReleaseYear: {
        type: String,
        required: true   
    },

    Format: {
        type: String,
        required: true
    },

    Stars: {
        type: String,
        required: true
    }
})

export default mongoose.model('Film', schema)