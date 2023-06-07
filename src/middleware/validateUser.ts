import { Request, Response } from "express";
import { NotAuthorisedError } from "@habeebllahmmj/common";
import { NextFunction } from "express";

export const validateUser = async (req: Request, res: Response, next: NextFunction) => {
  // console.log(req.currentUser)
  if (req.currentUser!.role !== "admin") {
    throw new NotAuthorisedError();
  }
  next();
};
// }
