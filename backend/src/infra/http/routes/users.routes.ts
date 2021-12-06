import { Request, Response, Router } from "express";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";
import multer from "multer";
import uploadConfig from "app/config/upload";
import UserController from "../controller/userController";
import UserAvatarController from "../controller/userAvatarController";

const usersRouter = Router();
const upload = multer(uploadConfig);
const userController = new UserController()
const userAvatarController = new UserAvatarController()

usersRouter.post("/", userController.create) 
  
usersRouter.patch("/avatar", ensureAuthenticated,upload.single("avatar"), userAvatarController.patch)

export { usersRouter };
