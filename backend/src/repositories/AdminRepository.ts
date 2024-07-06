import dbConnection from "../database/connection";
import { IAdmin } from "../interfaces/interfaces";

export default class AdminRepository {
  
  static async getAdmin(token: string): Promise<IAdmin | null> {  
    try {
      const query = 'SELECT * FROM "admin" WHERE token = $1';
      const { rows } = await dbConnection.query(query, [token]);
      return rows[0] || null; 
    } catch (error) {
      console.error('Database query error:', error);
      throw new Error('Database query error');
    }
  }
}