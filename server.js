import express from "express";

const app = express();

app.get('/', (req, res) => {
  res.send("here");
});

app.listen(5000, () => {
  console.log("hell yeah");
})
