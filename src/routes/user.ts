import { body } from "express-validator";
import { validateRequest } from "@habeebllahmmj/common";
import express from "express";
import { loginUser, logoutUser, signupUser } from "../controller/user";

const router = express.Router();

router.post(
  "/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
    body("firstName")
      .trim()
      .isLength({ min: 2, max: 20 })
      .withMessage("First Name must be between 2 and 20 characters"),
    body("lastName")
      .trim()
      .isLength({ min: 2, max: 20 })
      .withMessage("Last Name must be between 2 and 20 characters"),
  ],
  validateRequest,
  signupUser
);
router.post(
  "/users/login",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  validateRequest,
  loginUser
);

router.post("/users/logout", logoutUser);

export { router as userRouter };
