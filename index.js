const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express()
require("dotenv").config()
const port = process.env.PORT || 4000


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true}))


app.post('/signup', (req, res) =>{
    res.status(201).json({ message: "User Create Succesfully"})
})

app.post('/login', (req, res) =>{
    res.status(200).json({ message: "User Login Succesfully"})
})





app.get('/' , (req, res) => {
    res.send('Server Running!')
})


app.use((req, res, next) => {
    res.status(404).json({
      message: "Route Not Found",
    });
  });
  
  //Server Error
  app.use((err, req, res, next) => {
    res.status(500).json({
      message: "Something Broke",
    });
  });



app.listen(port)