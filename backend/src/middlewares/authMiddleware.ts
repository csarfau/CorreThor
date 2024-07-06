import { NextFunction, Request, Response } from "express";
import { BadRequestError, Unauthorized } from "../helpers/ApiErrors";
import AdminRepository from "../repositories/AdminRepository";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];

  if(!authHeader) {
    throw new BadRequestError ('Token não informado!');
  }

  const token = authHeader.split(' ')[1];
  const admin = AdminRepository.getAdmin(token);

  if(!admin) {
    throw new Unauthorized("Token inválido");
  }

  req.body = admin;
  next();
}