import { Request, Response } from "express";

export const appointmentsController = {
    findAll(request: Request, response: Response) {
        response.status(200).json({message: "asdasdasdasdasdasdçask  aaa"})
    }
}