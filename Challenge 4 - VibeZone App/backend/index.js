import express from "express";
import { PORT } from "./config.js";

const app = express();

app.get("/", (req, res) => {
  console.log("Got a Request!!!");
  return res.status(200).send("<h1>VibeZone</h1>");
});
app.get("/hello", (req, res) => {
  console.log("Got a Request!!!");
  return res.status(200).send("<h1>Test</h1>");
});

app.listen(PORT, () => {
  console.log(`App is listening on PORT: ${PORT}`);
});
