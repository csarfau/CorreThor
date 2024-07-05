import dbConnection from "../database/connection";
import { IAdmin } from "../interfaces/interfaces";

export default class {

  static async getAdmin(token: string): Promise<IAdmin> {
      const query = 'SELECT * FROM admin WHERE token = $1';
      const { rows } = await dbConnection.query(query, [token]);
      return rows[0];
  }
}