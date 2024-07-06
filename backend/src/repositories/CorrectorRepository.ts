import dbConnection from "../database/connection";
import { ICorrector } from "../interfaces/interfaces";

export default class {
  static async listCorrectors(): Promise<ICorrector[] | []> {
    const query = `SELECT * FROM corrector`;
    const { rows } = await dbConnection.query(query);
    return rows;
  }

  static async createCorrector(correctorName: string): Promise<ICorrector> {
    const query = `INSERT INTO corrector (name) VALUES ($1) RETURNING *`;
    const { rows } = await dbConnection.query(query, [correctorName]);    
    return rows[0];
  }

  static async updateCorrector(correctorName: string, correctorId: number): Promise<ICorrector> {
    const query = `UPDATE corrector SET name = $1 WHERE id = $2 RETURNING *`;
    const { rows } = await dbConnection.query(query, [correctorName, correctorId]);
    return rows[0];
  }

  static async deleteCorrector(correctorId: number): Promise<ICorrector> {
    const query = `DELETE FROM corrector WHERE id = $1`;
    const { rows } = await dbConnection.query(query, [correctorId]);
    return rows[0];
  }

  static async findCorrectorByName(correctorName: string): Promise<ICorrector> {
    const query = `SELECT * FROM corrector WHERE name = $1`;
    const { rows } = await dbConnection.query(query, [correctorName]);
    return rows[0];
  }
}