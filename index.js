const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 4000;
const User = require("./Models/UserModel");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.p06fddf.mongodb.net/UserAuth`;
mongoose
  .connect(uri)
  .then(() => {
    console.log("DB is Connected");
  })
  .catch((error) => {
    console.log(error);
  });

app.post("/signup", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ message: "User Create Succesfully" });
  } catch (error) {
    res.status(501).json(error.message);
  }
});

app.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });
      if (user && user.password === password) {
        res.status(200).json({ status: "User Login Succesfully" });
      } else {
        res.status(404).json({ status: "User Not Valid" });
      }
    } catch (error) {
      res.status(500).json(error.message);
    }
  });


app.get("/", (req, res) => {
  res.send("Server Running!");
});

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

app.listen(port);
