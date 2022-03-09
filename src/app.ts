import express from "express";
const app = express();
const port = 8070;

app.get("/", (req, res) => {
  res.send("Hello, get your videoshot now!");
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
