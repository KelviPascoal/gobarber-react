import { Router } from "express";
import SessionsController from "../controller/sessionsController";

const sessionsRouter = Router();
const sessionsController = new SessionsController()

sessionsRouter.post("/sessions", sessionsController.create);

export {sessionsRouter};
