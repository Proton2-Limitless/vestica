import { Request, Response } from "express";

import User from "../models/user";
import jwt from "jsonwebtoken";
import { BadRequestError } from "@habeebllahmmj/common";
import { Password } from "../utilities/password";

declare module "express-session" {
  interface SessionData {
    jwt?: string | null;
  }
}

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ where: { email } });
  if (!existingUser) {
    throw new BadRequestError("Invalid Credentials");
  }

  const passwordsMatch = await Password.compare(
    existingUser.password,
    password
  );

  if (!passwordsMatch) {
    throw new BadRequestError("Invalid Credentials");
  }

  const userJwt = jwt.sign(
    {
      id: existingUser.id,
      email: existingUser.email,
      role: existingUser.role,
    },
    process.env.JWT_KEY!
  );

  req.session.jwt = userJwt;

  res.status(201).send(existingUser);
};

export const signupUser = async (req: Request, res: Response) => {
  const { email, password, firstName, lastName, role = "user" } = req.body;
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new BadRequestError("Invalid Credentials");
  }
  const hashedPassword = await Password.toHash(password);
  const user = await User.create({
    email,
    password: hashedPassword,
    firstName,
    lastName,
    role,
  });

  const userJwt = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_KEY!
  );

  req.session.jwt = userJwt;

  res.status(201).send(user);
};

export const logoutUser = (req: Request, res: Response) => {
  req.session.jwt = null
  res.send({});
};
