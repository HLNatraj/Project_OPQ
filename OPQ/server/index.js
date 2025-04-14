const express = require("express")
const app = express()
const dotenv = require('dotenv').config()
const routes = require("F:/mern/React/OPQ/server/routes/routes")
const cors = require('cors');


app.use(express.json())

port = process.env.PORT

app.use("/api", routes )
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
  }));



app.listen(port, function(err){
    if(err){
        console.log("there is an error in starting the server")
    }
    console.log("Server is running at port "+ port)
})