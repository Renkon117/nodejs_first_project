// load a app server using express somehow...

const express = require  ("express")
const app = express ()
const morgan = require ("morgan")
const mysql = require ("mysql")
require('dotenv').config();
const bodyParser = require("body-parser")


app.use(bodyParser.urlencoded({extended:false}))

app.use(express.static("./public"))

app.use(morgan('short'))

// lets see how to start refactoring our code
// I'll will show you how to use something called Router

//import router from user.js
const router = require("./routes/user.js")

app.use(router)


// localhost:3003
app.listen(3003, () => {
  console.log("Server is up and listening on 3003...")
})
