import dotenv from "dotenv";
import http from "http";
import httpStatus from "http-status-codes";
import { mongodb } from "./mongodb.js";

const REFERENCE = "/reference";
const REGISTER = "/register";

dotenv.config();
const port = 3030,
  app = http.createServer(async (req, res) => {
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
      "Access-Control-Max-Age": 2592000, // 30 days
      "Content-Type": "application/json",
    };
    // httpStatus.OK:200
    let result = {};
    if (req.url === REGISTER) {
      res.writeHead(httpStatus.OK, headers);

      req
        .on("data", async function (chunk) {
          console.log(`BODY: ${chunk}`);
          await mongodb(JSON.parse(chunk));
        })
        .on("end", function () {
          res.end();
        });
    }

    if (req.url === REFERENCE) {
      res.writeHead(httpStatus.OK, headers);

      req
        .on("data", async function (chunk) {
          result = await mongodb(JSON.parse(chunk));
          // res.end(JSON.stringify(result));
        })
        .on("end", function () {
          res.end(JSON.stringify({ foo: "bar" }));
          // res.end();
        });
    }

    if (req.method === "OPTIONS") {
      res.writeHead(httpStatus.OK, headers);
      res.end();
    }

    res.writeHead(httpStatus.BAD_REQUEST, headers);
    res.end();
  });

app.listen(port);

console.log(`The server has started and is listening on port number: ${port}`);
