import { Request, Response } from "express";
import AdminService from "../services/AdminService";
import { IAdmin, IAPIResponse } from "../interfaces/interfaces";

export default class {
  static async getAdmin(req: Request, res: Response) {
    const token = req.body.admin.token;
    if(token) {
      const admin = await AdminService.getAdmin(token);
      const response: IAPIResponse<IAdmin> = {
        err: null,
        data: admin,
      }      
      return res.status(200).json(response);
    }
  }
} 
