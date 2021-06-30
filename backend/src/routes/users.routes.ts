import { Request, Response, Router } from "express";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";
import CreateUserServices from "../services/CreateUserServices";
import multer from "multer";
import uploadConfig from "../config/upload";
import UpdateUserAvatarService from "../services/UpdateUserAvatarService";

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post("/", async (request: Request, response: Response) => {
  try {
    const { name, email, password } = request.body;

    const CreateUser = new CreateUserServices();

    const user = await CreateUser.execute({
      name,
      email,
      password,
    });

    user.password = "private data!";

    return response.status(201).json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

usersRouter.patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  async (request, response) => {
    
    try {
      const updateUserAvatar = new UpdateUserAvatarService();
      const getFileName = request.file?.filename;

      if (getFileName) {
        const user = await updateUserAvatar.execute({
          user_id: request.user.id,
          avatarFileName: getFileName,
        });
        user.password = "private data!"

        return response.json(user);

      } else {
        throw new Error('Erro')
      }
      

    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
);

export { usersRouter };
