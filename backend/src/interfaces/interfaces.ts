import { ApiError } from "../helpers/ApiErrors"

export interface IAdmin {
  id: number,
  token: string,
  name: string,
}

export interface ICorrector {
  id: number,
  name: string
}

export interface ICorrection {
  id: number,
  corrector_id: number,
  class: string,
  module: string,
  meeting: string,
  student: string
}

export interface IAPIResponse<T> {
  data: T | null,
  err: Partial<ApiError> | null
}