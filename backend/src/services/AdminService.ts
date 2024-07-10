import { BadRequestError } from "../helpers/ApiErrors";
import { IAdmin } from "../interfaces/interfaces";
import AdminRepository from "../repositories/AdminRepository";

export default class {
  static async getAdmin(token: string): Promise<IAdmin | null> {
    const adminAuth = await AdminRepository.getAdmin(token);
    return adminAuth;
  }
}