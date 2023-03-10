import express from 'express'
const app = express()

app.use(express.json())

import dotenv from 'dotenv'
dotenv.config()

app.set('view engine', 'ejs')

import bodyParser from 'body-parser'
app.use(bodyParser.urlencoded({extended:true}))

import { dirname } from 'path'
import { fileURLToPath } from 'url'
const __dirname = dirname(fileURLToPath(import.meta.url))

import {create_data, read_data, update_data, delete_data, read_all_data} from './database.js'







app.get('/', async (req, res) => {
  const readAllData = await read_all_data()
  res.send(readAllData)
})

app.get('/notes/:title_name', async (req, res) => {
  const titleName = req.params.title_name
  res.send(await read_data(titleName))
})

app.get('/create', (req, res) => {
  res.sendFile(__dirname + '/create.html')
  // res.sendFile('D:/Work/ACodeX/A Web/projects/p04 - Web Course/back-end/08 SQL Database/create.html')
  // res.render('create')
})



app.post('/create', async (req, res) => {
  const {title, contents} = req.body
  const createData = await create_data(title, contents)
  // res.send(createData)
  res.redirect('/notes/'+title)
})







// npm audit fix
// npm audit fix --force

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log('Server is running on port '+port))
