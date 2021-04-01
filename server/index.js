import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import router from './routes/index.js'

const app = express()

app.use(bodyParser.json({limited: '30mb', extended: true}))
app.use(bodyParser.urlencoded({limited: '30mb', extended: true}))
app.use(cors())

app.use(router)

const CONNECTION_URL = 'mongodb+srv://webbylab:webbylab@cluster0.knari.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const PORT = 5000

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`server is running on port: ${PORT}`)))
    .catch((err) => console.log(err.message))

mongoose.set('useFindAndModify', false)