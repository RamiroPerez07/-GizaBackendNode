import { Request, Response, NextFunction } from "express"
import {validationResult, ValidationError, Result} from "express-validator"

export const recolectarErrores = (req: Request, res: Response, next: NextFunction): void => {
  const errors : Result<ValidationError> = validationResult(req)

  console.log(errors)

  if(!errors.isEmpty()){
    res.status(400).json(errors)
  } else {
    next()
  }
}