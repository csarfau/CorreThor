import dbConnection from "../database/connection";
import { ICorrection } from "../interfaces/interfaces";

export default class {
  static async listCorrectionsByCorrectorId(
    correctorId: number
  ): Promise<ICorrection[]> {
    const query = "SELECT * FROM correction WHERE corrector_id = $1";
    const { rows } = await dbConnection.query(query, [correctorId]);
    return rows;
  }

  static async createCorrection(
    correctorId: number,
    className: string,
    module: string,
    meeting: string,
    student: string
  ): Promise<ICorrection> {
    const query = `INSERT INTO correction (corrector_id, class, module, meeting, student) 
    VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    const { rows } = await dbConnection.query(query, [
      correctorId,
      className,
      module,
      meeting,
      student,
    ]);
    return rows[0];
  }

  static async updateCorrection(
    correctionId: number,
    correctorId: number,
    className: string,
    module: string,
    meeting: string,
    student: string): Promise<ICorrection> {
    const query = `UPDATE correction SET corrector_id = $1, "class" = $2, module = $3, 
    meeting = $4, student = $5 WHERE id = $6 RETURNING *`;
    const { rows } = await dbConnection.query(query, [
      correctorId,
      className,
      module,
      meeting,
      student,
      correctionId
    ]);
    return rows[0];
  }

  static async deleteCorrection(correctionId: number): Promise<ICorrection> {
    const query = `DELETE FROM correction WHERE id = $1 RETURNING *`;
    const { rows } = await dbConnection.query(query, [correctionId]);
    return rows[0];
  }

  static async findCorrectionById(correctionId: number): Promise<ICorrection> {
    const query = `SELECT * FROM correction WHERE id = $1`;
    const { rows } = await dbConnection.query(query, [correctionId]);
    return rows[0];
  }
}
