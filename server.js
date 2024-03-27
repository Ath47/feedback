const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("Connected to MongoDB"));

const surveySchema = new mongoose.Schema({
  Ans1: Number,
  Ans2: Number,
  Ans3: Number,
  Ans4: Number,
  Ans5: String,
});

const Answer = mongoose.model("Answer", surveySchema);

app.post("/", async (req, res) => {
  try {
    const { Ans1, Ans2, Ans3, Ans4, Ans5 } = req.body;

    await Answer.create({
      Ans1: Ans1,
      Ans2: Ans2,
      Ans3: Ans3,
      Ans4: Ans4,
      Ans5: Ans5,
    });

    res.status(200).json({ message: "Data saved successfully" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
