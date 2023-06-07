import express from "express";
import sequelize from "./database";
import "express-async-errors";
import { requestLogger } from "./utilities";
import { NotFoundError, errorHandler,currentUser } from "@habeebllahmmj/common";
import { userRouter } from "./routes/user";
import session from "express-session";
import cookieParser from "cookie-parser";
import { noteRouter } from "./routes/notes";

const app = express();

app.use(requestLogger);
app.use(express.json());

app.use(
  cookieParser()
)

app.use(
  session({
    secret: process.env.JWT_KEY!,
    resave: false,
    saveUninitialized: false,
  })
)

app.use("/api",userRouter);

app.use(currentUser);
app.use("/api",noteRouter);

app.use("*", (req, res, next) => {
  throw new NotFoundError("Route not found");
});

app.use(errorHandler);

app.listen(3000, async () => {
  console.log("Awaiting Database Connection");
  await sequelize.sync();
  console.log("Database Connected Successfully");
  console.log("Server is running on port 3000");
});
