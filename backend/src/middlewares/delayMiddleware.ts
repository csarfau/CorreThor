import { NextFunction, Request, Response } from "express";

export const delay = async (req: Request, res: Response, next: NextFunction) => {
  setTimeout(() => {
    next();
  }, 2000);
}