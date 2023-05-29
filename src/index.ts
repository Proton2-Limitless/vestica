import express from "express";
import { NotFoundError, errorHandler } from "@habeebllahmmj/common"

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("*", (req, res, next) => {
  throw new NotFoundError("Route not found");
});

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
