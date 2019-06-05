// load a app server using express somehow...

const express = require  ("express")
const app = express ()
const morgan = require ("morgan")
const mysql = require ("mysql")
require('dotenv').config();

app.use(morgan('combined'))

app.get("/user/:id", (req, res) =>{
  console.log("Fetching user with id: " + req.params.id)

  const connection = mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.DB_DATABASE
  })

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

  //res.end()
});

app.get("/",(req, res) => {
  console.log("Responding to root route")
  res.send("Hello from ROOOOT")
})

app.get("/users", (req, res) => {
  const user1 = {firstname: "Stephen", lastname: "Curry"}
  const user2 = {firstname: "Kevin", lastname: "Durant"}
  res.json({user1, user2})
})


// localhost:3003
app.listen(3003, () => {
  console.log("Server is up and listening on 3003...")
})
