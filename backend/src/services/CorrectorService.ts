import { Conflict, NotFound } from "../helpers/ApiErrors";
import { ICorrector } from "../interfaces/interfaces";
import CorrectorRepository from "../repositories/CorrectorRepository";

export default class {
  static async listCorrectors(): Promise<ICorrector[]> {
    const correctors = await CorrectorRepository.listCorrectors();
    return correctors;
  }

  static async createCorrector(correctorName: string): Promise<ICorrector> {
    const duplicatedCorrector = await CorrectorRepository.findCorrectorByName(correctorName);
    if(duplicatedCorrector) {
      throw new Conflict("Já há um corretor com esse nome cadastrado");
    }

    const newCorrector = await CorrectorRepository.createCorrector(correctorName);
    return newCorrector;
  }
  static async updateCorrector(correctorName: string, correctorId: number): Promise<ICorrector> {
    const duplicatedCorrector = await CorrectorRepository.findCorrectorByName(correctorName);
    if(duplicatedCorrector) {
      throw new Conflict("Já há um corretor com esse nome cadastrado");
    }

    const updatedCorrector = await CorrectorRepository.updateCorrector(correctorName, correctorId);
    return updatedCorrector;
  }
  static async deleteCorrector(correctorId: number): Promise<ICorrector> {
    const deletedCorrector = await CorrectorRepository.deleteCorrector(correctorId);
    if(deletedCorrector === undefined) {
      throw new NotFound("Corretor não encontrado");
    }
    
    return deletedCorrector;
  }
}