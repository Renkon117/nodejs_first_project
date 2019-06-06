// will contain all of my user related routes

const express =require("express")
const router = express.Router()
const mysql = require ("mysql")

require('dotenv').config();

router.get("/messages", (req, res) =>{
  console.log("Show some messages or whatever....")
  res.end()
})

router.get("/users", (req, res) => {
    const connection = getConnection()
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

const pool = mysql.createPool({
    connectionLimit: 10,
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.DB_DATABASE
})

function getConnection(){
    return pool 
}

router.post("/user_create", (req, res) =>{
    console.log("Trying to create a new user...")
    console.log("How do we get form data?")

    console.log("First name: " + req.body.create_first_name)
    console.log("Last name: " + req.body.create_last_name)
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
  
  
router.get("/user/:id", (req, res) =>{
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
  
router.get("/",(req, res) => {
    console.log("Responding to root route")
    res.send("Hello from ROOOOT")
})

//export the route to router module
module.exports = router