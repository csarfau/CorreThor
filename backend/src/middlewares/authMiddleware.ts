import { NextFunction, Request, Response } from "express";
import { BadRequestError, Unauthorized } from "../helpers/ApiErrors";
import AdminRepository from "../repositories/AdminRepository";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];

  if(!authHeader) {
    throw new BadRequestError ('Token não informado!');
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    throw new BadRequestError('Token não informado!');
  }
  
  const admin = await AdminRepository.getAdmin(token);
  console.log(admin);
  

  if(!admin) {
    throw new Unauthorized("Token inválido");
  }

  req.body.admin = admin;
  req.body.admin.token = token;
  next();
}