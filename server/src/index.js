//IMPORTS
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const newsRouters = require("./routers/newsRouter");

var cors = require("cors");

app.use(cors()); // Use this after the variable declaration

const PORT = 4000;

const MONGO_URI = "mongodb://localhost:27017/programacion3-2020";
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());

app.use(newsRouters);
app.listen(PORT, () => console.log("Iniciando app en puerto $(PORT)"));
