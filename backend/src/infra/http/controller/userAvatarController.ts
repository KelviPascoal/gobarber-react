import UpdateUserAvatarService from "app/services/PatchAvatarService/UpdateUserAvatarService";
import AppError from "domain/errors/AppErrors";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class UserAvatarController {
    public async patch(request: Request, response: Response): Promise<Response> {
      
      try {
        const updateUserAvatar = container.resolve(UpdateUserAvatarService);
        const getFileName = request.file?.filename;
  
        if (getFileName) {
          const user = await updateUserAvatar.execute({
            user_id: request.user.id,
            avatarFileName: getFileName,
          });
          user.password = "private data!"
  
          return response.json(user);
  
        } else {
          throw new AppError('Erro')
        }
        
  
      } catch (err: any) {
        return response.status(400).json({ error: err.message });
      }
    }
}