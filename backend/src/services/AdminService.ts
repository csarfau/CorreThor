import { BadRequestError } from "../helpers/ApiErrors";
import { IAdmin } from "../interfaces/interfaces";
import AdminRepository from "../repositories/AdminRepository";

export default class {
  static async getAdmin(admin: IAdmin): Promise<IAdmin | null> {
    const adminAuth = await AdminRepository.getAdmin(admin.token);
    return adminAuth;
  }
}