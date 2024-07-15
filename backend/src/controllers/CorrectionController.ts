import { Request, Response } from "express";
import CorrectionService from "../services/CorrectionService";
import { IAPIResponse, ICorrection } from "../interfaces/interfaces";
import { BadRequestError } from "../helpers/ApiErrors";

export default class {
  static async listCorrectionsByCorrectorId(req: Request, res:Response) {
    const correctorId = Number(req.params.correctorId);
    
    if(isNaN(correctorId)) {
      throw new BadRequestError("Corretor inválido");
    }
    
    const corrections = await CorrectionService.listCorrectionsByCorrectorId(correctorId);
    const response: IAPIResponse<ICorrection[]> = {
      err: null,
      data: corrections
    } 
    return res.status(200).json(response);
  }

  static async createCorrection(req: Request, res: Response) {
    const { correctorId, className, module, meeting, student } = req.body;
    console.log(req.body);
    
    if(!correctorId) {
      throw new BadRequestError("Corretor não informado");
    }

    if(!className) {
      throw new BadRequestError("Turma não informada");
    }

    if(!module) {
      throw new BadRequestError("Módulo não informado");
    }

    if(!meeting) {
      throw new BadRequestError("Aula não informada");
    }
    
    if(!student) {
      throw new BadRequestError("Aluno não informado");
    }

    const newCorrection = await CorrectionService.createCorrection(correctorId, className, module, meeting, student);
    const response: IAPIResponse<ICorrection> = {
      err: null,
      data: newCorrection
    } 
    return res.status(201).json(response);
  }

  static async updateCorrection(req: Request, res: Response) {
    const correctionId = Number(req.params.correctionId);
    if(isNaN(correctionId)) {
      throw new BadRequestError("Corretor inválido");
    }

    const { correctorId, className, module, meeting, student } = req.body;

    if(correctorId === "" || null) {
      throw new BadRequestError("Corretor não informado");
    }

    if(className === "" || null) {
      throw new BadRequestError("Turma não informada");
    }

    if(module === "" || null) {
      throw new BadRequestError("Módulo não informado");
    }

    if(meeting === "" || null) {
      throw new BadRequestError("Aula não informada");
    }
    
    if(student === "" || null) {
      throw new BadRequestError("Aluno não informado");
    }

    const updatedCorrection = await CorrectionService.updateCorrection(correctionId, correctorId, className, module, meeting, student);
    const response: IAPIResponse<ICorrection> = {
      err: null,
      data: updatedCorrection
    } 
    return res.status(200).json(response);
  }

  static async deleteCorrection(req: Request, res: Response) {
    const correctionId = Number(req.params.correctionId);
    if(isNaN(correctionId)) {
      throw new BadRequestError("Correção inválida!");
    }

    const deletedCorrection = await CorrectionService.deleteCorrection(correctionId);
    const response: IAPIResponse<ICorrection | null> = {
      err: null,
      data: deletedCorrection
    }
    res.status(200).json(response);
  }
}
