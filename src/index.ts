import express from "express";
import sequelize from "./database";
import { requestLogger } from "./utilities";
import { NotFoundError, errorHandler } from "@habeebllahmmj/common"

const app = express();

app.use(requestLogger)

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("*", (req, res, next) => {
  throw new NotFoundError("Route not found");
});

app.use(errorHandler);

app.listen(3000, async() => {
  console.log("Awaiting Database Connection");
  await sequelize.sync();
  console.log("Database Connected Successfully");
  console.log("Server is running on port 3000");
});
