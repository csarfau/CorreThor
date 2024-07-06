import { NextFunction, Request, Response } from "express";
import { ApiError } from "../helpers/ApiErrors";
import { IAPIResponse } from "../interfaces/interfaces";

export const errorMiddleware = (
  error: Error & Partial<ApiError>,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = error.statusCode ?? 500;
  console.log(error);
  
  const message = error.statusCode ? error.message : "Internal Server Error";
  const response: Partial<IAPIResponse<null>> = {
    data: null,
    err: { message: message }
  }
  return res.status(statusCode).json(response);
};
