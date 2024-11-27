const express = require('express')
const app = express()
const db=require('./db');
require('dotenv').config()

const bodyParser=require('body-parser');
app.use(bodyParser.json());  //req.body

app.get('/', function (req, res) {
  res.send('Hello User Welcome in the world of Node JS...! Happy Coding')
})

const personRoute=require('./routes/personRoutes')
app.use('/person',personRoute)

const menuRoute=require('./routes/menuRoutes')
app.use('/menu',menuRoute)

const PORT=process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log("Server is running on port 3000")
})