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

app.post("/user_create", (req, res) =>{
  console.log("Trying to create a new user...")
  console.log("How do we get form data?")

  console.log("First name: " + req.body.create_first_name)
  const firstName = req.body.create_first_name
  const lastName = req.body.create_last_name


  const queryString = "INSERT INTO users (first_name, last_name) VALUES (?,?)"
  getConnection().query(queryString, [firstName, lastName], (err, results, fields) => {
    if (err){
      console.log("Failed to insert new user" +err)
      res.sendStatus(500)
      return
    }

    console.log("Inserted a new user with id: ", results.insertedId);
    res.end()
  })
  res.end()
})

function getConnection(){
  return mysql.createConnection({host:process.env.DB_HOST,
  user:process.env.DB_USER,
  password:process.env.DB_PASS,
  database:process.env.DB_DATABASE
  })
}

app.get("/user/:id", (req, res) =>{
  console.log("Fetching user with id: " + req.params.id)

  const connection = getConnection()

  const userID = req.params.id
  const queryString = "SELECT * FROM users WHERE id = ?"
  connection.query(queryString, [userID], (err, rows, fields) =>{

    if (err) {
      console.log("Failed to query for users: " + err)
      res.sendStatus(500)
      res.end()
      return
    }

    console.log("I think we fetched users successfully!")

    const users = rows.map((row) =>{
      return {firstName: row.first_name, lastName: row.last_name}
    })

    res.json(users)
  })

});

app.get("/",(req, res) => {
  console.log("Responding to root route")
  res.send("Hello from ROOOOT")
})

app.get("/users", (req, res) => {
  const connection = mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.DB_DATABASE
  })

  const queryString = "SELECT * FROM users"
  connection.query(queryString, (err, rows, fields) =>{

    if (err) {
      console.log("Failed to query for users: " + err)
      res.sendStatus(500)
      return
    }

    res.json(rows)
  })
})


// localhost:3003
app.listen(3003, () => {
  console.log("Server is up and listening on 3003...")
})
