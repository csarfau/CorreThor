import dbConnection from "../database/connection";
import { ICorrector } from "../interfaces/interfaces";

export default class {
  static async listCorrectors(): Promise<ICorrector[] | []> {
    const query = `SELECT * FROM corrector`;
    const { rows } = await dbConnection.query(query);
    return rows;
  }

  static async createCorrector(corrector: ICorrector): Promise<ICorrector> {
    const query = `INSERT INTO corrector (name) VALUES $1 RETURNING *`;
    const { rows } = await dbConnection.query(query, [corrector.name]);
    return rows[0];
  }

  static async updateCorrector(corrector: ICorrector): Promise<ICorrector> {
    const query = `UPDATE corrector SET name = $1 RETURNING *`;
    const { rows } = await dbConnection.query(query, [corrector.name]);
    return rows[0];
  }

  static async deleteCorrector(correctorId: Partial<ICorrector>): Promise<ICorrector> {
    const query = `DELETE FROM corrector WHERE id = $1`;
    const { rows } = await dbConnection.query(query, [correctorId]);
    return rows[0];
  }
}