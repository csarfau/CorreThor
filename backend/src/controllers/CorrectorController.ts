import { Request, Response } from "express";
import CorrectorService from "../services/CorrectorService";
import { IAPIResponse, ICorrector } from "../interfaces/interfaces";
import { ApiError, BadRequestError } from "../helpers/ApiErrors";

export default class {
  static async listCorrectors(req: Request, res:Response) {
    const correctors = await CorrectorService.listCorrectors();
    const response: IAPIResponse<ICorrector[]> = {
      err: null,
      data: correctors
    }
    return res.status(200).json(correctors);
  }

  static async createCorrector(req: Request, res: Response) {
    const { name } = req.body;
    if(name === "" || null) {
      throw new BadRequestError("Nome do corretor não informado");
    }
    
    const newCorrector = await CorrectorService.createCorrector(name);
    const response: IAPIResponse<ICorrector> = {
      err: null,
      data: newCorrector
    }
    return res.status(201).json(response);
  }
  static async updateCorrector(req: Request, res: Response) {
    const correctorId = Number(req.params.correctorId); 
    if(isNaN(correctorId)) {
      throw new BadRequestError("Corretor inválido");
    }

    const { name } = req.body;
    if(name === "" || null) {
      throw new BadRequestError("Nome do corretor não informado");
    }

    const updatedCorrector = await CorrectorService.updateCorrector(name, correctorId);
    const response: IAPIResponse<ICorrector> = {
      err: null,
      data: updatedCorrector
    }
    return res.status(200).json(response);
  }
  static async deleteCorrector(req: Request, res: Response) {
    const correctorId = Number(req.params.correctorId);
    if(isNaN(correctorId)) {
      throw new BadRequestError("Corretor inválido");
    }

    const deletedCorrector = await CorrectorService.deleteCorrector(correctorId);
    const response: IAPIResponse<ICorrector> = {
      err: null,
      data: deletedCorrector
    }
    return res.status(200).json(response);
  }
}