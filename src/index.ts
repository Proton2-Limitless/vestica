import express from "express";
import "express-async-errors";
import { requestLogger } from "./utilities";
import { NotFoundError, errorHandler } from "@habeebllahmmj/common";
import { config } from "./configuration";

const app = express();

app.use(requestLogger);
app.use(express.json());

app.get("/", (req, res) => {
  res.send(`Welcome to ${config.APP_NAME} API`)
})

app.use("*", (req, res, next) => {
  throw new NotFoundError("Route not found");
});

app.use(errorHandler);

app.listen(3000, async () => {
  console.log("Server is running on port 3000");
});
