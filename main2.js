import express from "express";
import dotenv from "dotenv";
import { mongodb, deleteMongodb, getMongodb } from "./mongodb.js";

dotenv.config();

const REFERENCE = "/reference";
const REGISTER = "/register";
const DELETE = "/delete";
const app = express();

const port = 3030;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const hey = [
  { name: "Tom", age: "18" },
  { name: "John", age: "20" },
];

app.post("/hello", (req, res) => {
  res.send("Hello " + req.body.name);
});

app.post("/hey", (req, res) => {
  res.json(hey);
});

app.post(REFERENCE, async (req, res) => {
  let result = await mongodb(req.body);
  console.log(result);
  res.json(result);
});

app.get(REFERENCE, async (req, res) => {
  let result = await getMongodb(req.body);
  console.log(result);
  res.json(result);
});

app.delete(DELETE, async (req, res) => {
  console.log(req.body);
  let result = await deleteMongodb(req.body);
  console.log(result);
  res.json(result);
});

app.listen(port, () => {
  console.log("Application started");
});
