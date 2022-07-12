const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express()
require("dotenv").config()
const port = process.env.PORT || 4000


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true}))



app.get('/' , (req, res) => {
    res.send('Server Running!')
})



app.listen(port)