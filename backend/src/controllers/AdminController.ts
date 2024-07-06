import { Request, Response } from "express";
import AdminService from "../services/AdminService";
import { IAdmin, IAPIResponse } from "../interfaces/interfaces";

export default class {
  static getAdmin(req: Request, res: Response) {
    try {
      const admin = AdminService.getAdmin(req.body);
      if (admin !== null && admin !== undefined) {
        const response: IAPIResponse<IAdmin> = {
          err: null,
          data: admin,
      }
        return res.status(200).json(response);
      } 
    } catch (error) {
        const response: IAPIResponse<null> = {
          data: null,
          err: null,
        }
    }
  }
} 
