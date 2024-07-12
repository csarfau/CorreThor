import { BadRequestError, NotFound } from "../helpers/ApiErrors";
import { ICorrection, ICorrector } from "../interfaces/interfaces";
import CorrectionRepository from "../repositories/CorrectionRepository";

export default class {
  static async listCorrectionsByCorrectorId(
    correctorId: number
  ): Promise<ICorrection[]> {
    const corrections = await CorrectionRepository.listCorrectionsByCorrectorId(
      correctorId
    );

    return corrections;
  }

  static async createCorrection(
    correctorId: number,
    className: string,
    module: string,
    meeting: string,
    student: string
  ): Promise<ICorrection> {
    const newCorrection = await CorrectionRepository.createCorrection(
      correctorId,
      className,
      module,
      meeting,
      student
    );
    return newCorrection;
  }

  static async updateCorrection(
    correctionId: number,
    correctorId: number,
    className: string,
    module: string,
    meeting: string,
    student: string): Promise<ICorrection> {

      
      const existingCorrection = await CorrectionRepository.findCorrectionById(correctionId);
      if(existingCorrection === undefined) {
        throw new BadRequestError("Correção não encontrada!");
      }
      
      if(existingCorrection.corrector_id !== correctorId) {
        throw new BadRequestError("Corretor não pode ser alterado!");
      }

      const updatedCorrection = await CorrectionRepository.updateCorrection(
        correctionId,
        correctorId,
        className,
        module,
        meeting,
        student
      );
      console.log(updatedCorrection);
      
      return updatedCorrection;    
  }

  static async deleteCorrection(correctionId: number): Promise<ICorrection> {
    const deletedCorrection = await CorrectionRepository.deleteCorrection(correctionId);
    if(deletedCorrection === undefined) {
      throw new NotFound("Correção não encontrada!");
    }
    
    return deletedCorrection;
  }
}
